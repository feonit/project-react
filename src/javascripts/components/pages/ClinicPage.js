import { Component } from 'react'
import translate from '../../i18n/Translate'
import { Link } from 'react-router'
import GoBackButton from '../modules/GoBackButton'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/UserActions'
import ImgPreview from '../modules/ImgPreview'
import PreloaderView from '../modules/PreloaderView'

class ClinicPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentIndex: 0,
            loaded: false
        }
        this.onNextClick = this.onNextClick.bind(this)
        this.onPrevClick = this.onPrevClick.bind(this)
    }

    componentWillMount(){
        this.props.fetchData(this.props.routeParams.clinicId)
            .then(()=> {
                this.setState({loaded: true})
            })
    }

    onNextClick(){
        this.setState({
            currentIndex: this.state.currentIndex + 1 === this.props.clinics[this.props.routeParams.clinicId].gallery.length
                ? 0
                : this.state.currentIndex + 1
        })
    }

    onPrevClick(){
        this.setState({
            currentIndex: this.state.currentIndex === 0
                ? this.props.clinics[this.props.routeParams.clinicId].gallery.length - 1 // last
                : this.state.currentIndex - 1 // prev
        })
    }
    
    render(){
        var trans = this.props.trans;
        var clinic = null;
        var clinicToMedics = this.props.clinicToMedics;
        var medics = this.props.medics;
        var patient = this.props.patient;
        var specialities = this.props.specialities;
        var medicsOfClinic;

        if (this.props.clinics) {
            clinic = this.props.clinics[this.props.routeParams.clinicId]
        }

        if (clinic) {
            medicsOfClinic = [];
            var ids = clinicToMedics[clinic.id];
            if (ids) {
                medicsOfClinic = ids.map((id)=> {
                    return medics[id]
                })
            }
        }

        function findSpec(specialities, id) {
            var search = specialities.find((m)=> {
                return m.id === id
            });

            return search ? search.name : 'Нет специальности'
        }

        var gallerySlide;

        if (clinic && clinic.gallery.length) {
            gallerySlide = clinic.gallery[this.state.currentIndex]
        }

        function oneYearIsLost(dateISO){
            return (+(new Date()) - +(new Date(dateISO))) > 365*24*60*60*1000;
        }

        return !this.state.loaded ? <PreloaderView/> : (
            <div>
                <div className="static_header">
                    <div className="left_angle_block pad_top_regular fixed_arrow">
                        <GoBackButton/>
                    </div>
                    <div className="full_scren_image_block">
                        <div className="image_full_field">
                            <section className="profile_header_attached">
                                <Link title="Профиль" to="/profile" className="profile_item_block white_icon"></Link>
                                <Link className="top_line_left" to="/calendar">telemed.</Link>
                                <span className="head_line_border"></span>
                                <span className="top_line_left">Поликлиника</span>
                            </section>
                            <div className="photo_container_clinik">
                                <ImgPreview src={clinic.promoLink} alt="Промо фото"/>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="center_block">
                    <section className="info_section_block relative_pg">
                        <div className="step_block_cell left_small_step width_step540">
                            <div className="header_name txt_border">
                                {clinic.name}
                            </div>
                            <div className="description_txt_block">
                                <div>{clinic.location}</div>
                                <div>{clinic.city}, Российская Федерация</div>
                            </div>
                            <div className="description_txt_block">
                                {
                                    clinic.phones.map((phone)=> {
                                        return <div key={phone} className="inline_txt">{phone}</div>
                                    })
                                }
                                <div className="inline_txt">
                                    <Link className="">{clinic.email}</Link>
                                </div>
                            </div>
                        </div>
                        { (patient.clinicId === clinic.id && patient.attachmentState === 'ATTACHED' ) ? (
                            <div className="step_block_cell width_step220 attach_status">
                                <div className="icon_graph left_pos markflag_icon mobile-none"></div>
                                <div className="description_txt_block clear_left">
                                    <div>
                                        Вы прикреплены <br />
                                        к этой поликлинике
                                    </div>
                                </div>
                                {patient.attachmentDate && (oneYearIsLost((patient.attachmentDate))) &&
                                <div className="description_txt_block">
                                    <Link to="/attachment/clinic">Поменять поликлинику</Link>
                                </div>
                                }
                            </div>
                        ) : ''}
                    </section>
                    <section className="info_section_block">
                        <div className="step_block_cell left_small_step fly_width">
                            <div className="description_txt_block big_description">
                                <p>{clinic.info}</p>
                            </div>
                        </div>
                    </section>
                    <section className="info_section_block">
                        <section className="step_block_cell width_step270">
                            <div className="left_block_header">
                                Персонал
                            </div>
                            <div className="small_separator"></div>
                        </section>
                        <section className="step_block_cell width_step250 triple_column mobile-personal">
                            {medicsOfClinic.map((medic)=> {
                                return (
                                    <section key={medic.id} className="step_block_cell width_step250">
                                        <div className="image_block_doctor">
                                            <img src={medic.avatarLink} alt="Фотография"/>
                                        </div>
                                        <div className="doctor_small_description">
                                            <Link to={`/medics/${medic.id}`}>
                                                {medic.surname + ' ' + medic.givenName}
                                                <br />
                                                {medic.patronymic}
                                            </Link>
                                            <div className="clinic_descript_txt">
                                                {findSpec(specialities, medic.specialityId)}
                                            </div>
                                        </div>
                                    </section>
                                )
                            })}
                            {/*<section className="step_block_cell width_step250">
                             <div className="arrow_switch">
                             <Link className="navi_arrow left_trig"></Link>
                             <Link className="navi_arrow right_trig"></Link>
                             </div>
                             </section>*/}

                        </section>
                    </section>
                </div>

                { !gallerySlide ? '' : (
                    <div className="gallery_block">
                        <div className="gallery_mask"></div>
                        <ImgPreview src={gallerySlide.link} alt={gallerySlide.name}/>
                        <div className="inside_gallery">
                            <div className="info_section_block">
                                <div className="gallery_switch">
                                    <Link onClick={this.onPrevClick}
                                          className="navi_arrow white_arrow left_trig"></Link>
                                    <Link onClick={this.onNextClick}
                                          className="navi_arrow white_arrow right_trig"></Link>
                                </div>
                                <div className="gal_header">Что внутри</div>
                                <div className="separate_block"></div>
                                <div className="gal_description">
                                    {gallerySlide.name}
                                </div>
                                <div className="gal_image"></div>
                                <div className="gal_description">
                                    {gallerySlide.description}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="center_block">
                    <section className="info_section_block">
                        <section className="step_block_cell width_step250">
                            <div className="left_block_header">
                                Документы
                            </div>
                            <div className="small_separator"></div>
                        </section>
                        <section className="step_block_cell width_step250 double_column">
                            {clinic.docs.map((doc)=> {
                                return (
                                    <div key={doc.name} className="regular_txt_block">
                                        <div>
                                            <a href={doc.link}>{doc.name}</a>
                                        </div>
                                        <div>в формате .pdf</div>
                                    </div>
                                )
                            })}
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

export default translate("ClinicPage")(
    connect( state => ({
        specialities: state.user.specialities,
        clinics: state.user.clinics,
        medics: state.user.medics,
        patient: state.user.patient,
        clinicToMedics: state.user.dataModels.clinicToMedicsOneToMany
    }), dispatch => ({
        fetchData: (clinicId) => Promise.all([
            dispatch(actions.fetchSpecialities()),
            dispatch(actions.fetchClinic(clinicId)),
            dispatch(actions.fetchMedicsOfClinic(clinicId))
        ])
    }))
(ClinicPage))
