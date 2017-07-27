import { Component } from 'react'
import translate from '../../i18n/Translate'
import { Link } from 'react-router'
import GoBackButton from '../modules/GoBackButton'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/UserActions'
import PreloaderView from '../modules/PreloaderView'

class ProfilePage extends Component{
    constructor(props){
        super(props)
        this.state = { isLoaded: false }
    }

    componentWillMount(){
        var pull = [
            this.props.fetchClinic(this.props.patient.clinicId),
            this.props.fetchProfile(this.props.authorizationData.patientId)
        ];
        if (this.props.patient.medicId === null){
            pull.push(this.props.fetchMedic(this.props.patient.medicId))
        }
        Promise.all(pull)
            .then(()=>{
                this.setState({
                    isLoaded: true
                })
            })
    }
    
    render(){
        var trans = this.props.trans;

        var starString = function(str){
            if (typeof str === "string"){
                return str.replace(/^([\d\s\wа-яёА-ЯЁ\.\-@]{0,5})/gi, function(){
                    var r = '';
                    var len = arguments[0].length;
                    while(len--){r+='*'}
                    return r;
                })
            } else {
                return str;
            }
        };

        return !this.state.isLoaded ? <PreloaderView /> : (
            <div className="center_block">
                <section className="full_profile_header">
                    <div className="left_angle_block fixed_arrow">
                        <GoBackButton/>
                    </div>
                    <div className="mid_header_block">
                        <Link title="Профиль" to="/profile" className="profile_item_block"></Link>
                        <Link className="top_line_left" to="/calendar">telemed.</Link>
                        <span className="head_line_border"></span>
                        <span className="top_line_left">Профиль</span>
                    </div>
                </section>

                <section className="info_section_block more_bot_pad mobile-nopad">
                    <section className="step_block_cell left_small_step width_step470">
                        <div className="header_name">
                            {this.props.patient.surname} <br />
                            {this.props.patient.givenName} <br />
                            {this.props.patient.patronymic}
                        </div>
                    </section>
                    <section className="step_block_cell width_step270 mobile-none">
                        <div><Link className="profile_links" to="/settings/system">Настройки и безопасность</Link></div>
                        <div className="pad_top_small"><Link className="profile_links" to="/logout">Выйти</Link></div>
                    </section>
                </section>

                <section className="info_section_block">
                    <section className="step_block_cell width_step270 mobile-none">
                        <div className="icon_graph left_pos profile_icon"></div>
                    </section>
                    <section className="step_block_cell width_step220">
                        <div className="left_block_header">
                            Общее
                        </div>
                        <div className="small_separator"></div>
                    </section>
                    <section className="step_block_cell">
                        <div className="description_txt_block">
                            {(function(){
                                var view;
                                if (this.props.clinic){
                                    view =
                                        <div>
                                            <div>Поликлиника</div>
                                            <div>
                                                <Link title="Изменить" to={`/clinics/${this.props.clinic.id}`}>
                                                    {this.props.clinic.name}
                                                </Link>
                                            </div>
                                        </div>
                                } else {
                                    view = "Вы не прикреплены к клинике"
                                }
                                return view;
                            }).call(this)}
                        </div>
                        <div className="description_txt_block">
                            {(()=>{
                                var view;
                                if (this.props.medic){
                                    view =
                                        <div>
                                            <div>Лечащий специалист</div>
                                            <Link title="Изменить" to={`/medics/${this.props.medic.id}`}>
                                                {`${this.props.medic.surname} ${this.props.medic.givenName} ${this.props.medic.patronymic}`}
                                            </Link>
                                        </div>
                                } else {
                                    view = "У Вас пока нет лечащего врача"
                                }

                                return view;
                            })()}
                        </div>
                    </section>
                </section>

                <section className="info_section_block">
                    <section className="step_block_cell left_small_step width_step220">
                        <div className="left_block_header">
                            Контакты
                        </div>
                        <div className="small_separator"></div>
                    </section>
                    <section className="step_block_cell">
                        <div className="description_txt_block">
                            <div>Мобильный телефон</div>
                            <div><Link title="Изменить" to="/settings/contacts">{starString(this.props.patient.mobilePhone) || 'Добавить'}</Link></div>
                        </div>
                        <div className="description_txt_block">
                            <div>Дополнительный телефон</div>
                            <div><Link title="Изменить" to="/settings/contacts">{starString(this.props.patient.additionalPhone) || 'Добавить'}</Link></div>
                        </div>
                        <div className="description_txt_block">
                            <div>Электронная почта</div>
                            <div><Link title="Изменить" to="/settings/contacts">{starString(this.props.patient.email)}</Link></div>
                        </div>
                    </section>
                </section>

                <section className="info_section_block">
                    <section className="step_block_cell left_small_step width_step220">
                        <div className="left_block_header">
                            Документы
                        </div>
                        <div className="small_separator"></div>
                    </section>
                    <section className="step_block_cell">
                        <div className="description_txt_block">
                            <div>Номер СНИЛС</div>
                            <div className="limecolor_txt">
                                {this.props.patient.snils}
                            </div>
                        </div>
                        <div className="description_txt_block">
                            <div>Полис обязательного медстрахования</div>
                            <div>
                                <Link title="Изменить" to="/settings/insurance">{starString(this.props.patient.insurancePolicyNumber) || 'Добавить'}</Link>
                            </div>
                        </div>
                        <div className="description_txt_block">
                            <div>
                                <div>Документ</div>
                                <div>
                                    {(()=>{
                                        var passportPlaceholder = (((this.props.patient.documentSerial && (this.props.patient.documentSerial + '  '))  || '') + (this.props.patient.documentNumber || ''));

                                        return <Link title="Изменить" to="/settings/passport">{starString(passportPlaceholder) || 'Добавить'}</Link>

                                    })()}
                                </div>
                            </div>
                        </div>
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
        )
    }
}
export default translate('ProfilePage')((connect(
    state => ({
        patient: state.user.patient,
        authorizationData: state.auth.authorizationData,
        medic: (state.user.patient.medicId !== null) && state.user.medics[state.user.patient.medicId],
        clinic: state.user.clinics[state.user.patient.clinicId]
    }),
    dispatch => ({
        fetchClinic: (clinicId) => dispatch(actions.fetchClinic(clinicId)),
        fetchProfile: (patientId) => dispatch(actions.fetchProfile(patientId)),
        fetchMedic: (medicId) => dispatch(actions.fetchMedic(medicId))
    })
)(ProfilePage)))
