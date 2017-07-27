import translate from '../../../i18n/Translate'
import { Component } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import PreloaderView from '../../modules/PreloaderView/index'
import DateTitle from '../../modules/calendar/DateTitle'
import CalendarComponent from '../../modules/calendar/CalendarComponent'
import * as actions from '../../../redux/actions/UserActions'
import { browserHistory } from 'react-router'
import ButtonSubmitForm from '../../modules/ButtonSubmitForm/index'
import config from '../../../config'

class MeetingSelectDateView extends Component{
    constructor(props){
        super(props)
        this.state = {
            _eventSource: null,
            isFetched: false,
            selectedDate: null
        }
        this.onSelectDate = this.onSelectDate.bind(this)
        this.onClickTime = this.onClickTime.bind(this)
        this.onSubmitClick = this.onSubmitClick.bind(this)
    }
    
    componentDidMount(){
        this._subscribeEventSource(() => {
            if (this.props.medicId){
                if (!this.props.schedules.find( schedule => this.props.medicId === schedule.medicId )){
                    return this.props.fetchSchedule(this.props.medicId, this.props.meetingForm.type)
                        .then(()=>{
                            this.setState({ isFetched: true })
                        })
                }
            }
        });
    }

    componentWillUnmount(){
        this._unsubscribeEventSource();
        this.props.removeSchedules();
    }

    _subscribeEventSource(onopen){
        var eventSource = this.state._eventSource;

        if (!(eventSource && eventSource.readyState === eventSource.CLOSED)){
            eventSource = new EventSource(config.ORIGIN_EVENT_SOURCE + this.props.eventSourceChannel);
        }

        eventSource.onerror = error => {
            throw error;
        };

        eventSource.onopen = () => {
            this.setState({ _eventSource: eventSource });
            if (onopen){
                onopen();
            }
        };

        eventSource.onmessage = event => {
            console.log("Пришло сообщение: " + event.data);
            this.props.receiveSchedule(JSON.parse(event.data))
        };
    }

    _unsubscribeEventSource(){
        if (this.state._eventSource){
            this.state._eventSource.close()
        }
    }

    onSelectDate(date){
        this.setState({selectedDate: this._findDateByNumber(date)})
    }

    onClickTime(time){
        this.setState({selectedTime: time})
    }

    onSubmitClick(){
        var type = this.props.meetingForm.type;
        var medicId = this.props.medicId;

        var date = new Date(this.state.selectedDate);
        var time = this.state.selectedTime.split(/\:|\-/g);

        date.setHours(time[0]);
        date.setMinutes(time[1]);

        var subzero = function (num){
            return (''+num).length == 1 ? '0'+num : num;
        };

        //YYYY-MM-DDThh:mm:ss
        var dateTime = `${date.getFullYear()}-${subzero(date.getMonth()+1)}-${subzero(date.getDate())}T${subzero(date.getHours())}:${subzero(date.getMinutes())}:00`;

        if (this.props.meetingForm.id){
            return this.props.fetchUpdateReception(this.props.meetingForm.id, medicId, this.props.patient.id, dateTime)
                .then(()=>{
                    browserHistory.push('/calendar')
                })
        } else {
            return this.props.fetchCreateReception(type, medicId, this.props.patient.id, dateTime)
                .then(()=>{
                    browserHistory.push('/calendar')
                })
        }
    }

    _findDateByNumber(number){
        var item = this.props.currentSchedule.list.find((item)=>{
            return (new Date(item.date)).getDate() === number
        })
        return item && item.date;
    }
    
    render(){
        var trans = this.props.trans;

        if (this.props.currentSchedule){
            var scheme = this.props.currentSchedule.list.map((item)=>{
                return {
                    date: (new Date(item.date)).getDate(),
                    counter: item.freeTime.length
                }
            })

            var times;
            if (this.state.selectedDate){
                var find = this.props.currentSchedule.list.find((item)=>{
                    return item.date === this.state.selectedDate
                })
                if (find){
                    times = find.freeTime;
                }
            }
        }

        return !(this.state.isFetched && this.props.currentSchedule) ? <PreloaderView/> : (
            <section className="mid_center_block">
                <div className="step_block_cell">
                    <DateTitle timestamp={+(new Date('2017-02-01'))}/>

                    <div className="table_holder">
                        <CalendarComponent changeDateCallback={this.onSelectDate} date={(new Date(this.state.selectedDate).getDate())} counterScheme={scheme} currentTimestamp={+(new Date('2017-02-01'))}/>
                    </div>

                    <div className="btn_placeholder mobile-fix_bottom">
                        <ButtonSubmitForm onClick={this.onSubmitClick} className="btn_style">{this.props.meetingForm.id ? 'Изменить': 'Записаться'}</ButtonSubmitForm>
                    </div>
                </div>

                <div className="time_select">
                    <div className="time_line_block active_time_sel">

                        {this.state.selectedDate && (
                            <div className="foating_time_txt">
                                <div className="header_table_in">
                                    <div className="month_selector_block">Время</div>
                                </div>
                                <table className="time_table">
                                    <tbody>
                                    {(()=>{
                                        var trs = [];
                                        var tds = [];
                                        var LIMIT_IMEMS = 4;
                                        this.state.selectedDate && times.map((time, index)=>{

                                            tds.push(
                                                <td key={time} onClick={this.onClickTime.bind(this, time)} className={classNames({"selected_day": this.state.selectedTime === time})}>
                                                    <span>{time}</span>
                                                </td>
                                            );

                                            // если следующий элемент начинается с новой строки или если достигнут конец массива
                                            // ложим текущий пул в коллекцию и сбрасываем пул

                                            if ( !( (index+1) % LIMIT_IMEMS ) || (index+1 === times.length)){
                                                trs.push(
                                                    <tr key={index}>{tds}</tr>
                                                );
                                                tds = [];
                                            }
                                        });
                                        return trs;
                                    })()}
                                    </tbody>
                                </table>
                            </div>
                        )}

                    </div>
                </div>

                <div className="scroll_mask time_scroll"></div>
            </section>
        );
    }
}
export default connect((state)=>({
    medicId: state.user.meetingForm.medicId,
    eventSourceChannel: state.auth.authorizationData.eventSourceChannel,
    patient: state.user.patient,
    schedules: state.user.schedules,
    meetingForm: state.user.meetingForm,
    currentSchedule: state.user.schedules.find( schedule => (schedule.medicId === state.user.meetingForm.medicId ))
}), dispatch => ({
    fetchSchedule: (medicId, type) => dispatch(actions.fetchSchedule(medicId, type)),
    fetchUpdateReception: (id, medicId, patientId, dateTime) => dispatch(actions.fetchUpdateReception(id, medicId, patientId, dateTime)),
    fetchCreateReception: (type, medicId, patientId, dateTime) => dispatch(actions.fetchCreateReception(type, medicId, patientId, dateTime)),
    receiveSchedule: data => dispatch(actions.receiveSchedule(data)),
    removeSchedules: () => dispatch(actions.removeSchedules())
}))(MeetingSelectDateView);