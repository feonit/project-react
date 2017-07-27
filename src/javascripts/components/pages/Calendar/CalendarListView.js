import translate from '../../../i18n/Translate'
import { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import * as actions from '../../../redux/actions/UserActions'
import {connect} from 'react-redux'
import classNames from 'classnames'
import PreloaderView from '../../modules/PreloaderView'
import {subzero} from '../../../helpers/time'

function objToArr(obj){
    return Object.values(obj);
    // return Object.keys(obj).sort(sortByAlphaBetta).map((key)=>{
    //     return obj[key]
    // });
}

function sortByAlphaBetta(a, b){
    return +a > +b;
}

function findPropNameByValue(src, value){
    return Object.keys(src).find((checkedName)=>{
        return src[checkedName] === value ? checkedName : false;
    })
}

function sortByDateTime(a, b){
    return (new Date(a.dateTime)) > (new Date(b.dateTime))
}


var monthMap = {
    0: "Январь",
    1: "Февраль",
    2: "Март",
    3: "Апрель",
    4: "Май",
    5: "Июнь",
    6: "Июль",
    7: "Август",
    8: "Сентябрь",
    9: "Октябрь",
    10: "Ноябрь",
    11: "Декабрь"
}

var daysMap = {
    0: "воскресенье",
    1: "понедельник",
    2: "вторник",
    3: "среда",
    4: "четверг",
    5: "пятница",
    6: "суббота",
}

class CalendarListView extends Component{
    constructor(props){
        super(props)
        this.state = { fetchedAll: false }
    }

    componentWillMount(){
        this.props.loadData(this.props.patient.id, this.props.patient.clinicId)
            .then(()=>{
                this.setState({
                    fetchedAll: true
                })
            })
    }

    render(){
        var dataByYears = {}; // { 2016: { 0: { 11: [] } } }

        if (this.state.fetchedAll && this.props.receptions.length === 0){
            this.context.router.replace('/calendar/empty')
        }

        this.props.receptions.forEach((item)=>{
            var year = new Date(item.dateTime).getFullYear();
            dataByYears[year] || (dataByYears[year] = {})
            var month = new Date(item.dateTime).getMonth();
            dataByYears[year][month] || (dataByYears[year][month] = {})
            var day = new Date(item.dateTime).getDate();
            dataByYears[year][month][day] || (dataByYears[year][month][day] = [])
            dataByYears[year][month][day].push(item)
        });

        return (
            !this.state.fetchedAll ? <PreloaderView/> : <ReceptionsListView
                data={dataByYears}
                specialities={this.props.specialities}
                receptions={this.props.receptions}
                medics={this.props.medics}/>
        );
    }
}

CalendarListView.contextTypes = {
    router: PropTypes.object
}

export default connect((state)=>({
    patient: state.user.patient,
    medics: state.user.medics,
    specialities: state.user.specialities,
    receptions: objToArr(state.user.receptions)
}), dispatch => ({
    loadData: (patientId, clinicId) =>
        Promise.all([
            dispatch(actions.fetchAllReceptions(patientId)),
            dispatch(actions.fetchSpecialities()),
            dispatch(actions.fetchMedicsOfClinic(clinicId))
        ])
}))(CalendarListView);


class ReceptionsListView extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentReception: null
        }
    }

    componentDidMount(){
        var curDate = new Date();
        var reception = this.props.receptions.find((reception) => {
            return curDate > new Date(reception.dateTime)
        });

        if (reception){
            this.setState({ currentReception: reception })
        }
    }

    componentDidUpdate(){
        function findHeight(parentNode, srcNode, height = 0){
            if (parentNode.contains(srcNode)){
                Array.prototype.slice.call(parentNode.children, 0)
                    .forEach((child)=>{ height =+ findHeight(child, srcNode, height) })
            } else {
                height += parentNode.scrollHeight;
            }
            return height;
        }

        var height = findHeight(this.refs.scroll_container, this.refs.scroll_position_here);

        this.refs.scroll_container.scrollTop = height;
    }

    render(){
        var key = 0;

        var that = this;

        var findSpec = function (medicId){
            var finded = that.props.specialities.find((item)=>{
                var medic = that.props.medics[medicId]
                return item.id === medic.specialityId
            });
            return finded.name;
        }

        var makeItem = function(reception){
            return (
                <div key={key++} className="day_note_item">
                    <div className="day_time_item">
                        <Link to={`/meetings/${reception.id}`} className={classNames("doctor_name_link", {
                            "success_status": (reception.status === "UNCONFIRMED") || (reception.status === "PLANNED"),
                            "notice_status": reception.status === "FINISHED",
                            "error_status": reception.status === "CANCELLED"
                        })}>
                            {findSpec(reception.medicId)}
                        </Link>
                    </div>
                    <div className="day_name_item">
                        <span className="time_span_item">{subzero((new Date(reception.dateTime)).getHours()) + ':' + subzero((new Date(reception.dateTime)).getMinutes())}</span>
                        {/*todo*/reception.type === 'HOME' ? <span className="ambulance_image"></span> : ''}
                        {reception.status === 'UNCONFIRMED' ? <span className="wait_icon"></span> : ''}
                    </div>
                </div>
            )
        }

        var makeDay = function(receptions, dayCount){
            var dayWeek = (new Date(receptions[0].dateTime)).getDay()

            return (
                <div className="weak_section" key={key++}>
                    <div className="date_item_block">
                        <div className="number_item">{dayCount} {daysMap[dayWeek]}</div>
                    </div>
                    <div className="items_list_block">
                        { receptions.sort(sortByDateTime).map((reception) => {
                            return (
                                <div
                                    ref={that.state.currentReception === reception ? "scroll_position_here" : null}
                                    className={that.state.currentReception === reception ? "scroll_position_here" : null}>
                                    {makeItem(reception)}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }

        var makeMonth = function(dataByDays, monthCount){
            return (
                <section key={key++} className="calendar_item">
                    <div className="date_curent_month">{monthMap[monthCount]}</div>
                    { objToArr(dataByDays).map((receptions)=> {
                        return makeDay(receptions, findPropNameByValue(dataByDays, receptions))
                    })}
                </section>
            )
        }

        var makeYear = function(dataByMonth){
            return objToArr(dataByMonth).map((dataByDays)=>{
                return makeMonth(dataByDays, findPropNameByValue(dataByMonth, dataByDays))
            })
        }

        return (
            <div ref="scroll_container" className="calendar_scroll">
                { objToArr(this.props.data).map((dataByMonth)=>{
                    return makeYear(dataByMonth);
                })}
            </div>
        )
    }
}