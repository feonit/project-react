import { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import translate from '../../i18n/Translate'
import GoBackButton from '../modules/GoBackButton'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/UserActions'
import classNames from 'classnames'
import PreloaderView from '../modules/PreloaderView'
import { UNCONFIRMED_STATUS, PLANNED_STATUS, FINISHED_STATUS, CANCELLED_STATUS } from '../../models/Reception'
import {subzero} from '../../helpers/time'

class MeetingPage extends Component{
    constructor(props){
        super(props)
        this.state = { clinic: null, reception: null, medic: null, eventSource: null }
        this.onCancelClick = this.onCancelClick.bind(this)
    }

    componentWillMount(){
        return this.fetchData.apply(this, [this.props])
    }

    componentWillReceiveProps(nextProps){
        return this.fetchData.apply(this, arguments)
    }

    fetchData(nextProps){
        var reception,
            clinic;

        if (nextProps.receptions
            && ( reception = nextProps.receptions[nextProps.routeParams.meetingId] ) ){

            if (this.props.clinics
                && ( clinic = nextProps.clinics[reception.clinicId] ) ){

                this.setState({ clinic: clinic, reception: reception })
            } else {
                this.props.fetchClinic(reception.clinicId)
            }

            if (nextProps.medics && nextProps.medics[reception.medicId]){
                this.setState({ medic: nextProps.medics[reception.medicId] })
            } else {
                this.props.fetchMedic(reception.medicId);
            }
        } else {
            this.props.fetchReception(nextProps.patient.id, nextProps.routeParams.meetingId)
        }

        if (!nextProps.specialities){
            this.props.fetchSpecialities();
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return !!(nextState.clinic && nextState.reception)
    }

    onCancelClick(){
        this.props.updateReception(this.props.patient.id, this.state.reception.id, { status: 'CANCELLED'})
            .then(()=>{
                this.context.router.push('/calendar');
            })
    }
    
    render(){
        var trans = this.props.trans;
        var reception = this.state.reception;
        var clinic = this.state.clinic;
        var medic = this.state.medic;
        var specialities = this.props.specialities;

        var view = <PreloaderView />;

        var ready = !!(reception && clinic && medic && specialities);

        if (ready){
            var dateObj = new Date(reception.dateTime);
            var months = [
                'января',
                'февраля',
                'марта',
                'апреля',
                'мая',
                'июня',
                'июля',
                'августа',
                'сентября',
                'октября',
                'ноября',
                'декабря'
            ]
            var compositeDate = dateObj.getDate() + ' ' + months[dateObj.getMonth()] + ' ' + dateObj.getFullYear()
            var time = subzero(dateObj.getHours()) + ':' + subzero(dateObj.getMinutes());
            var medicFullName = `${medic.surname} ${medic.givenName} ${medic.patronymic}`
            var spec = specialities.find((item)=>{return medic.specialityId === item.id})
            var specName = spec && spec.name;
        }

        return !ready ? view : (
            <div className="center_block">
                <section className="full_profile_header">
                    <div className="left_angle_block fixed_arrow">
                        <GoBackButton/>
                    </div>
                    <div className="mid_header_block">
                        <Link title="Профиль" to="/profile" className="profile_item_block"></Link>
                        <Link className="top_line_left" to="/calendar">telemed.</Link>
                        <span className="head_line_border"></span>
                        <span className="top_line_left">Карточка лечения</span>
                    </div>
                </section>

                <section className="info_section_block more_bot_pad">
                    <div className="step_block_cell left_small_step width_step270 double_column">
                        <div className="sign_day_name">{specName}</div>
                    </div>
                </section>

                <section className="info_section_block more_bot_pad">
                    <div className="step_block_cell width_step270 mobile-none">
                        <div className={classNames("icon_graph left_pos", {
                            "home_tool_icon": reception.type === 'HOME',
                            "doctor_tool_icon": reception.type === 'CLINIC',
                            })}></div>
                    </div>
                    <div className="step_block_cell width_step220">
                        <div className="description_txt_block">
                            <div className="bottom_txt_note pad_bot_halftiny">Время приема</div>
                            <div className="big_font header_Color">{compositeDate}</div>
                            <div className="big_font header_Color">{time}</div>
                        </div>
                    </div>
                    <div className="step_block_cell width_step220">
                        <div className="description_txt_block">
                            <div className="bottom_txt_note pad_bot_halftiny">Поликлиника</div>
                            <div>
                                <Link className="big_font" to={`/clinics/${clinic.id}`}>{clinic.shortName}</Link>
                            </div>
                        </div>
                    </div>
                    <div className="step_block_cell width_step220">
                        <div className="description_txt_block">
                            <div className="bottom_txt_note pad_bot_halftiny">Лечащий специалист</div>
                            <div>
                                <Link className="big_font" to={`/medics/${medic.id}`}>{medicFullName}</Link>
                            </div>
                        </div>
                    </div>
                    <div className="step_block_cell width_step220 triple_column left_small_step">
                        <div className="small_separator both_side_pad"></div>
                        {
                            (reception.status === UNCONFIRMED_STATUS || reception.status === PLANNED_STATUS) && (
                                <div className="description_txt_block">
                                    <div className="bottom_txt_note">
                                        Это активная запись. Вы можете отменить <br /> или перенести прием
                                    </div>
                                </div>
                            )
                        }
                        {
                            (reception.status === CANCELLED_STATUS) && (
                                <div className="icon_note_block">
                                    <div className="icon_place">
                                        <div className="icon_graph left_pos cancelled_icon"></div>
                                    </div>
                                    <div className="text_icon_description">
                                        <div className="description_txt_block">
                                            <div>Отмененный прием.</div>
                                            <div>Создайте новый на главной странице.</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            (reception.status === FINISHED_STATUS) && (
                                <div className="icon_note_block">
                                    <div className="icon_place">
                                        <div className="icon_graph left_pos sucess_dark_icon"></div>
                                    </div>
                                    <div className="text_icon_description">
                                        <div className="description_txt_block">
                                            <div className="center_txt">Прием завершен</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            (reception.status === UNCONFIRMED_STATUS || reception.status === PLANNED_STATUS) && (
                                <div className="btn_placeholder">
                                    <button onClick={this.onCancelClick} type="button" className="btn_style">Отменить</button>
                                    <Link to={`/meeting/${reception.id}`} className="btn_style">Перенести</Link>
                                </div>
                            )
                        }
                    </div>
                </section>

                {reception.conclusion && (
                    <div>
                        <section className="info_section_block">
                            <div className="step_block_cell left_small_step width_step470">
                                <div className="header_name">
                                    Постановлениe <br /> врача
                                </div>
                            </div>
                        </section>
                        <section className="info_section_block">
                            <div className="step_block_cell width_step320 double_column left_small_step">
                                <div className="step_block_cell clear_left width_step220">
                                    <div className="left_block_header">
                                        Заключение
                                    </div>
                                    <div className="small_separator"></div>
                                </div>
                                <div className="step_block_cell">
                                    <div className="description_txt_block">
                                        <div className="med_font header_Color">{reception.conclusion}</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                <div className="static_foot_info">
                    <div className="copy_right">Nephrology Expert Council</div>
                    <div className="foot_clin_name">
                        <Link to="/index">
                            <div className="small_icon_bot"></div>
                        </Link>
                    </div>
                    <Link className="link_foot_style" to="/feedback">Помощь</Link>
                    <Link className="link_foot_style" to="/agreement">Правовая информация</Link>
                    <Link className="link_foot_style" to="/about">О сайте</Link>
                </div>

            </div>
        );
    }
}

MeetingPage.contextTypes = {
    router: PropTypes.object
}

export default translate("MeetingPage")(
connect(state => ({
    clinics: state.user.clinics,
    medics: state.user.medics,
    specialities: state.user.specialities,
    patient: state.user.patient,
    receptions: state.user.receptions
}), dispatch => ({
    fetchClinic: id => dispatch(actions.fetchClinic(id)),
    fetchMedic: id => dispatch(actions.fetchMedic(id)),
    fetchReception: (patientId, receptionId) => dispatch(actions.fetchReception(patientId, receptionId)),
    fetchSpecialities: () => dispatch(actions.fetchSpecialities()),
    updateReception: (patientId, receptionId, data) => dispatch(actions.updateReception(patientId, receptionId, data)),
}))
(MeetingPage));