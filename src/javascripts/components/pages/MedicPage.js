import { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import translate from '../../i18n/Translate'
import GoBackButton from '../modules/GoBackButton'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/UserActions'
import ImgPreview from '../../components/modules/ImgPreview'
import { DATE_HASH } from '../../enums/MeetingCreatePageHashes'

class MedicPage extends Component{
    constructor(props){
        super(props)
        this.onBtnClick = this.onBtnClick.bind(this)
    }

    componentWillMount(){
        var medic = this.props.medics[this.props.routeParams.medicId]

        if (!medic){
            this.props.fetchMedic(this.props.routeParams.medicId)
        } else {
            this.props.fetchClinic(medic.clinicId)
        }

        var specialities = this.props.specialities;

        if (!specialities){
            this.props.fetchSpecialities();
        }
    }

    onBtnClick(){
        this.props.putMedicIdToMeetingForm(this.props.medics[this.props.routeParams.medicId].id);
        this.context.router.push({pathname: '/meeting', hash: DATE_HASH})
    }
    
    render(){
        var trans = this.props.trans;
        var medic = this.props.medics[this.props.routeParams.medicId];
        var specialities = this.props.specialities;
        var clinic;
        var speciality;
        var view = <span>...грузится медик</span>

        if (medic){
            clinic = this.props.clinics[medic.clinicId]

            if (clinic && specialities){
                speciality = specialities.find((item)=>{ return item.id === medic.specialityId})
            }
        }

        return !(medic && specialities && clinic) ? view : (
            <div>
                <div className="static_header">
                    <div className="left_angle_block pad_top_regular fixed_arrow">
                        <GoBackButton/>
                    </div>
                    <div className="full_scren_image_block">
                        <div className="image_full_field">
                            <section className="profile_header_attached">
                                <Link title="Профиль" to="/profile" className="profile_item_block"></Link>
                                <Link className="top_line_left" to="/calendar">telemed.</Link>
                                <span className="head_line_border"></span>
                                <span className="top_line_left">Специалист</span>
                            </section>
                            <div className="photo_container_doctor">
                                <ImgPreview src={medic.photoLink} alt="Фотография медика" />
                            </div>

                            <div className="full_screen_doc_info">
                                <div className="doctor_full_name_block">
                                    {medic.surname} <br/>
                                    {medic.givenName} <br/>
                                    {medic.patronymic}
                                </div>
                                <div className="doctor_year_block tiny_pad">
                                    <p>{speciality.name}</p>
                                    <p>{clinic.name}</p>
                                </div>
                                { this.props.previousPathname.match('meeting') &&
                                <div className="btn_placeholder">
                                    <button onClick={this.onBtnClick} type="button" className="btn_style">Выбрать</button>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="center_block">
                    <section className="info_section_block">
                        <section className="step_block_cell width_step270">
                            <div className="left_block_header">
                                О специалисте
                            </div>
                            <div className="small_separator"></div>
                        </section>
                        <section className="step_block_cell width_step410">
                            <div className="regular_txt_block">
                                {medic.info}
                            </div>
                        </section>
                        <section className="step_block_cell inside_top_pad width_step320">
                            <div className="icon_graph left_pos flowerpot_icon mobile-none"></div>
                            <div className="years_exp">
                                {new Date().getFullYear() - new Date(medic.workSince).getFullYear()} лет
                            </div>
                            <div className="exp_info_txt">
                                общий стаж по специальности <br />
                                «{speciality.name}»
                            </div>
                        </section>
                    </section>
                    <section className="info_section_block">
                        <section className="step_block_cell width_step270">
                            <div className="left_block_header">
                                Образование
                            </div>
                            <div className="small_separator"></div>
                        </section>
                        <section className="section_group group_width270">
                            {(()=>{
                                return medic.educations && medic.educations.map((education)=>{
                                        return (
                                            <section className="step_block_cell width_step410">
                                                <div className="info_year_lime">
                                                    {education.year}
                                                </div>
                                                <div className="regular_txt_block text_sync">
                                                    <div>{education.institution}</div>
                                                    <div className="kvalification_block">
                                                        {education.speciality}
                                                    </div>
                                                </div>
                                                <Link to={education.documentLink} >{education.type}</Link>
                                            </section>
                                        )
                                    })
                            })()}
                        </section>
                    </section>
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
            </div>
        )
    }
}

MedicPage.contextTypes = {
    router: PropTypes.object
}

export default translate("MedicPage")(
    connect( state => ({
        previousPathname: state.user.previousPathname,
        medics: state.user.medics,
        clinics: state.user.clinics,
        specialities: state.user.specialities
    }), dispatch => ({
        putMedicIdToMeetingForm: id => dispatch(actions.putMedicIdToMeetingForm(id)),
        fetchMedic: medicId => dispatch(actions.fetchMedic(medicId)),
        fetchClinic: clinicId => dispatch(actions.fetchClinic(clinicId)),
        fetchSpecialities: () => dispatch(actions.fetchSpecialities())
    }))
(MedicPage));