import { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'
import translate from '../../../i18n/Translate'
import FooterMenu from '../../modules/FooterMenu'
import GoBackButton from '../../modules/GoBackButton'
import { connect } from 'react-redux'
import ImgPreview from '../../modules/ImgPreview'
import * as actions from '../../../redux/actions/UserActions'
import {HOME_TYPE, CLINIC_TYPE} from '../../../models/Reception'
import MeetingSelectDateView from './MeetingSelectDateView'
import MeetingSelectDoctorView from './MeetingSelectDoctorView'
import PreloaderView from '../../modules/PreloaderView/index'
import {MEDIC_HASH, DATE_HASH} from '../../../enums/MeetingCreatePageHashes'

class MeetingCreatePage extends Component{
    constructor(props){
        super(props)
        this.state = { isLoaded: false }
        this.checkForPrevent = this.checkForPrevent.bind(this)
    }

    componentDidMount(){
        // проверка хеша
        var hash = this.props.location.hash;

        var defaultHash = MEDIC_HASH;

        if ( !hash || (hash !== MEDIC_HASH && hash !== DATE_HASH) ){
            this.changeHash(defaultHash)

            // изменился
            hash = defaultHash;
        }

        // для редактирования подтягиваем прием
        if (this.props.routeParams.receptionId){
            this.props.fetchReception(this.props.patient.id, this.props.routeParams.receptionId)
                .then(()=>{
                    this.setState({isLoaded: true})
                    this.props.putReceptionToMeetingForm(this.props.routeParams.receptionId)
                })
                .catch(err=>{throw err})

        } else {
            // для создания устанавливаем дефолтные значения

            // загрузка не понадобилась
            this.setState({isLoaded: true})

            // проверка типа, если тип не определен, то для создании приема устанавливается дефолтовый тип
            var type = this.props.location.query.type && this.props.location.query.type.toUpperCase();

            var defaultType = CLINIC_TYPE;

            if ( !type || (type !== CLINIC_TYPE && type !== HOME_TYPE) ){
                this.context.router.replace({
                    pathname: this.props.location.pathname,
                    hash: hash,
                    query: Object.assign({}, this.props.location.query, { type: defaultType.toLowerCase() })
                })
                type = defaultType;
            }

            // запомнить
            this.props.putType(type);
        }
    }

    componentWillReceiveProps(){
        // this.checkForExistingMedic();
    }

    componentWillUnmount(){
        this.props.resetMeetingForm()
    }

    checkForPrevent(event){
        // переход на дату-время возможен только после выбора специалиста
        if (typeof this.props.meetingForm.medicId === "undefined"){
            event.preventDefault();
        }
    }

    //Если у пациента указан (medicId),
    // то специалист становится предвыбранным и пациент сразу попадает на страницу выбора даты-времени.
    checkForExistingMedic(){
        if (typeof this.props.patient.medicId !== "undefined"){
            this.props.putMedicIdToMeetingForm(this.props.patient.medicId)
            this.changeHash(DATE_HASH)
        }
    }

    changeHash(hash){
        this.context.router.replace({
            pathname: this.props.location.pathname,
            query: this.props.location.query,
            hash: hash
        })
    }
    
    render(){
        var pathname = this.props.location.pathname;
        var query = this.props.location.query;
        var hash = this.props.location.hash;
        var isAtHouse = this.props.meetingForm.type === HOME_TYPE;
        var photoLink = this.props.chosenMedic && this.props.chosenMedic.photoLink;
        var showBackground = hash === MEDIC_HASH;
        var medic = this.props.chosenMedic;
        // var datePlaceholder = "21 сентября 2016"
        var datePlaceholder = "Выберите дату";
        var medicPlaceholder = medic ? `${medic.surname} ${medic.givenName} ${medic.patronymic}` : "Специалист";

        return !this.state.isLoaded ? <PreloaderView/> : (
            <div>
                <div className="main_content">
                    <div className="left_static_column">
                        <div className="side_space">
                            <GoBackButton/>
                        </div>
                        <div className="mid_side_space">
                            <Link className={classNames("selector_step_block", {"chosen": hash === DATE_HASH, "curent_chose": hash === MEDIC_HASH})}
                                  to={{pathname: pathname, query: query, hash: MEDIC_HASH}}>
                                <span className="header_step_txt">{ hash === MEDIC_HASH ? "Специалист" : medicPlaceholder}</span>
                                <span className="header_step_note">{ hash === MEDIC_HASH ? "Выберите специалиста": "Специалист"}</span>
                            </Link>
                            <Link onClick={this.checkForPrevent} disabled="disabled" className={classNames("selector_step_block", {"chosen": hash === MEDIC_HASH, "curent_chose": hash === DATE_HASH})}
                                  to={{pathname: pathname, query: query, hash: DATE_HASH }}>
                                <span className="header_step_txt">{ hash === MEDIC_HASH ? (isAtHouse ? "Дата прихода":"Дата приема") : datePlaceholder }</span>
                                <span className="header_step_note">{ hash === MEDIC_HASH ? "Выберите дату" : (isAtHouse ? "Дата прихода":"Дата приема") }</span>
                            </Link>
                            <div className="info_bot_desc">
                                <div className="icon_graph left_pos docbag_icon"></div>
                                <div className="med_font_description pad_top_regular no_bot_pad">
                                    Выбранный специалист станет вашим лечащим врачом на последующих приемах.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mid_static_column">
                        <section className="telmed_header_line">
                            <Link title="Профиль" to="/profile" className="profile_item_block"></Link>
                            <Link className="top_line_left" to="/calendar">telemed.</Link>
                            <span className="head_line_border"></span>
                            <span className="top_line_left">{isAtHouse? "Пригласить врача" : "Записаться на прием"}</span>
                        </section>

                        {
                            /** тут вставляется контент выбранной вкладки */
                            hash === MEDIC_HASH ? <MeetingSelectDoctorView location={this.props.location}/> : <MeetingSelectDateView location={this.props.location}/>
                        }

                    </div>


                    <FooterMenu />

                    <div className="bot_icon_container">
                        <Link to="/index">
                            <div className="small_icon_bot"></div>
                        </Link>
                    </div>

                </div>
                {
                    showBackground && (
                        <div className="doctor_photo">
                            <ImgPreview src={photoLink} alt="Фото медика" />
                        </div>
                    )
                }
            </div>
        );
    }
}

MeetingCreatePage.contextTypes = {
    router: PropTypes.object
}

export default connect((state)=>({
    patient: state.user.patient,
    hash: state.user.routing.hash,
    meetingForm: state.user.meetingForm,
    chosenMedic: state.user.medics[state.user.meetingFormChosenValues.chosenMedicId]
}), (dispatch)=>({
    putType: type => dispatch(actions.putReceptionTypeToMeetingForm(type)),
    putReceptionToMeetingForm: (receptionId) => dispatch(actions.putReceptionToMeetingForm(receptionId)),
    fetchReception: (patientId, receptionId) => dispatch(actions.fetchReception(patientId, receptionId)),
    resetMeetingForm: () => dispatch(actions.resetMeetingForm()),
    putMedicIdToMeetingForm: id => dispatch(actions.putMedicIdToMeetingForm(id))
}))(MeetingCreatePage);