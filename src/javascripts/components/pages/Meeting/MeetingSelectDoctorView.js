import translate from '../../../i18n/Translate'
import { Component, PropTypes } from 'react'
import { Link, withRouter } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../../../redux/actions/UserActions'
import PreloaderView from '../../modules/PreloaderView/index'
import { browserHistory } from 'react-router'

class MeetingSelectDoctorView extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentIndex: null,
            loadedData: false
        }
        this.onPrevClick = this.onPrevClick.bind(this)
        this.onNextClick = this.onNextClick.bind(this)
        this.onBtnClick = this.onBtnClick.bind(this)
    }

    componentDidMount(){
        this.props.fetchData(this.props.patient.clinicId)
            .then(()=>{
                this.setState({loadedData: true});
                this.props.setMeetingBackgroundByMedicId(this.props.medics[this.state.currentIndex].id);
            })
    }

    componentWillReceiveProps(){
        if (this.state.currentIndex === null){

            if (typeof this.props.meetingForm.medicId !== "undefined" ){
                if (this.props.medics.length){
                    var medic = this.props.medics.find((medic)=>{return medic.id === this.props.meetingForm.medicId });
                    var index = this.props.medics.indexOf(medic);
                    this.setState({
                        currentIndex: index
                    })
                }
            } else {
                this.setState({
                    currentIndex: 0
                })
            }
        } 
    }

    onPrevClick(){
        this.setState({
            currentIndex: this.state.currentIndex === 0
                ? this.props.medics.length -1 // last
                : this.state.currentIndex - 1 // prev
        }, ()=>{
            this.props.setMeetingBackgroundByMedicId(this.props.medics[this.state.currentIndex].id);
        })
    }

    onNextClick(){
        this.setState({
            currentIndex: this.state.currentIndex + 1 >= this.props.medics.length
                ? 0
                : this.state.currentIndex + 1
        }, ()=>{
            this.props.setMeetingBackgroundByMedicId(this.props.medics[this.state.currentIndex].id);
        })
    }

    onBtnClick(event){
        event.preventDefault();
        this.props.putMedicIdToMeetingForm(this.props.medics[this.state.currentIndex].id);
        this.props.router.push( {pathname: this.props.location.pathname, query: this.props.location.query, hash: '#date' })
    }
    
    render(){
        var trans = this.props.trans;

        //Если в массиве - один специалист, то отображение навигации по специалистам - не показывается
        var visible = Object.keys(this.props.medics).length > 1;

        return !this.state.loadedData ? <PreloaderView/> : (
            <section className="mid_center_block">
                <div className="doctor_image_place">
                    { visible &&
                    <div className="navigation_arrows">
                        <div onClick={this.onPrevClick} className="navi_arrow left_trig"></div>
                        <div onClick={this.onNextClick} className="navi_arrow right_trig"></div>
                    </div>
                    }
                    {(()=>{
                        var medic = this.props.medics[this.state.currentIndex];
                        return (
                            <div>
                                <div className="doctor_full_name_block">
                                    {medic.surname} <br />
                                    {medic.givenName} <br />
                                    {medic.patronymic}
                                </div>
                                <div className="doctor_year_block">
                                    <p>{this.props.specialities.find((item)=>{return item.id === medic.specialityId}).name}, стаж {new Date().getFullYear() - new Date(medic.workSince).getFullYear()} лет</p>
                                    <p><Link to={`/medics/${medic.id}`}>профиль специалиста</Link></p>
                                </div>
                            </div>
                        )
                    })()}
                    <div className="btn_placeholder">
                        <Link onClick={this.onBtnClick} to="/meeting" className="btn_style" >Выбрать</Link>
                    </div>
                </div>
            </section>
        );
    }
}

MeetingSelectDoctorView.propTypes = {
    location: PropTypes.object,
    router: PropTypes.object
}

export default connect((state)=>{
    var medicsArr = Object.keys(state.user.medics).map((id)=>{return state.user.medics[id]});

    return {
        routing: state.user.routing,
        patient: state.user.patient,
        meetingForm: state.user.meetingForm,
        specialities: state.user.specialities,
        medics: medicsArr
    }
}, (dispatch)=>({
    putMedicIdToMeetingForm: id => dispatch(actions.putMedicIdToMeetingForm(id)),
    setMeetingBackgroundByMedicId: id => dispatch(actions.meetingChoosenMedicId(id)),
    fetchData: clinicId =>
        Promise.all([
            dispatch(actions.fetchMedicsOfClinic(clinicId)),
            dispatch(actions.fetchSpecialities())
        ])
}))(withRouter(MeetingSelectDoctorView));