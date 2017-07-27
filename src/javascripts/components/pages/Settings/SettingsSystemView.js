import { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import ButtonSubmitForm from '../../modules/ButtonSubmitForm'
import GoBackButton from '../../modules/GoBackButton'
import CustomInput from '../../modules/CustomInput'
import CustomSelect from '../../modules/CustomSelect'
import {LanguageEnumLangRu, NotificationEnumLangRu} from '../../../models/Patient'
import * as actions from '../../../redux/actions/UserActions'
import {connect} from 'react-redux'
import translate from '../../../i18n/Translate'

class SettingsSystemView extends Component{
    constructor(props){
        super(props)
        this.state = {
            passwordFormIsOpened: false
        }
        this.onFocus = this.onFocus.bind(this)
        this.onBtnClick = this.onBtnClick.bind(this)
        this.onLanguageChange = this.onLanguageChange.bind(this)
        this.onNotificationChange = this.onNotificationChange.bind(this)
        this.onPasswordOldChange = this.onPasswordOldChange.bind(this)
        this.onPasswordNewChange = this.onPasswordNewChange.bind(this)
        this.onPasswordNewChangeRepeat = this.onPasswordNewChangeRepeat.bind(this)
    }

    onFocus(){
        if (!this.state.passwordFormIsOpened){
            this.setState({ passwordFormIsOpened: true })
        }
    }
    onBtnClick(event){
        event.preventDefault();

        var iterable = [this.props.fetchPutPatient(this.props.patient.id, this.props.settingsForm)];

        if (Object.keys(this.props.passwordForm).length){
            iterable.push(this.props.fetchPasswordForm(this.props.patient.id, this.props.passwordForm))
        }
        return Promise.all(iterable)
            .then( values => {
                let patientResponse;
                let passwordResponse;
                [patientResponse, passwordResponse] = values;
                if (passwordResponse){
                    this.context.router.push('/profile')
                } else {
                    this.context.router.push('/profile')
                }
            })
            .catch(err=>{throw err})
    }
    onLanguageChange(event){
        this.props.putData({language: event.target.value})
    }
    onNotificationChange(event){
        this.props.putData({notification: event.target.value})
    }
    onPasswordOldChange(event){
        this.props.putPasswordData({passwordOld: event.target.value})
    }
    onPasswordNewChange(event){
        this.props.putPasswordData({passwordNew: event.target.value})
    }
    onPasswordNewChangeRepeat(event){
        this.props.putPasswordData({passwordNewRepeat: event.target.value})
    }

    render(){
        var transCodes = this.props.transCodes;
        var optionsLang = Object.keys(LanguageEnumLangRu).map((item)=>({id: item, name: LanguageEnumLangRu[item]}));
        var optionsNote = Object.keys(NotificationEnumLangRu).map((item)=>({id: item, name: NotificationEnumLangRu[item]}));

        return (
            <div className="center_block">
                <section className="full_profile_header">
                    <div className="left_angle_block fixed_arrow">
                        <GoBackButton/>
                    </div>
                    <div className="mid_header_block">
                        <Link title="Профиль" to="/profile" className="profile_item_block"></Link>
                        <Link className="top_line_left" to="/calendar">telemed.</Link>
                        <span className="head_line_border"></span>
                        <Link to="/profile" className="top_line_left">Профиль</Link>
                    </div>
                </section>

                <section className="info_section_block more_bot_pad mobile-nopad">
                    <div className="step_block_cell left_small_step width_step470">
                        <div className="header_name">
                            Настройки  <br />
                            сайта
                        </div>
                    </div>
                </section>

                <section className="info_section_block">
                    <div className="step_block_cell width_step270 mobile-none">
                        <div className="icon_graph left_pos setting_icon"></div>
                    </div>
                    <div className="mid_space_block">
                        <div className="form_container_section">
                            <div className="step_block_cell width_step270">
                                <div className="input_placeholder">
                                    <CustomSelect
                                        title={transCodes[this.props.patientErrors.language] || "Язык интерфейса"}
                                        onChange={this.onLanguageChange}
                                        value={this.props.language}
                                        ref="language"
                                        className="text_input_style"
                                        items={optionsLang}
                                    >
                                    </CustomSelect>
                                </div>
                            </div>
                            <div className="step_block_cell width_step270">
                                <div className="input_placeholder">
                                    <CustomSelect
                                        title={transCodes[this.props.patientErrors.notification] || "Оповещение"}
                                        ref="note"
                                        onChange={this.onNotificationChange}
                                        value={this.props.notification}
                                        className="text_input_style"
                                        items={optionsNote}
                                    >
                                    </CustomSelect>
                                </div>
                            </div>

                            <div className="step_block_cell width_step270 clear_left">
                                <div className="input_placeholder">
                                    <CustomInput
                                        labelText={this.state.passwordFormIsOpened ? "Текущий пароль" : "Изменить пароль"}
                                        errorText={transCodes[this.props.passwordErrors.passwordOld]}
                                    >
                                        <input
                                            onChange={this.onPasswordOldChange}
                                            onFocus={this.onFocus}
                                            value={this.props.passwordOld}
                                            type="password"
                                            className="text_input_style"
                                        />
                                    </CustomInput>
                                </div>
                            </div>

                            { this.state.passwordFormIsOpened && (
                                <div>
                                    <div className="step_block_cell width_step270">
                                        <div className="input_placeholder">
                                            <CustomInput
                                                labelText={"Новый пароль"}
                                                errorText={transCodes[this.props.passwordErrors.passwordNew]}
                                            >
                                                <input
                                                    onChange={this.onPasswordNewChange}
                                                    value={this.props.passwordNew}
                                                    type="password"
                                                    className="text_input_style"
                                                />
                                            </CustomInput>
                                        </div>
                                    </div>
                                    <div className="step_block_cell width_step220">
                                        <div className="input_placeholder">
                                            <CustomInput
                                                labelText={"Новый пароль еще раз"}
                                                errorText={transCodes[this.props.passwordErrors.passwordNewRepeat]}
                                            >
                                                <input
                                                    onChange={this.onPasswordNewChangeRepeat}
                                                    value={this.props.passwordNewRepeat}
                                                    type="password"
                                                    className="text_input_style"
                                                />
                                            </CustomInput>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="btn_placeholder">
                            <ButtonSubmitForm onClick={this.onBtnClick} className="btn_style" type="button">Сохранить</ButtonSubmitForm>
                        </div>

                    </div>

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

        );
    }
}

SettingsSystemView.contextTypes = {
    router: PropTypes.object
}

export default translate("SettingsSystemView")(connect((state)=>{
    var merged = Object.assign({}, state.user.patient, state.user.settingsForm, state.user.passwordForm);
    return {
        patientErrors: state.user.patientErrors,
        passwordErrors: state.user.passwordErrors,
        patient: state.user.patient,
        settingsForm: state.user.settingsForm,
        passwordForm: state.user.passwordForm,
        language: merged.language,
        notification: merged.notification,
        passwordOld: merged.passwordOld || '',
        passwordNew: merged.passwordNew || '',
        passwordNewRepeat: merged.passwordNewRepeat || ''
    }
}, (dispatch)=>({
    putData: data => dispatch(actions.putSettingsData(data)),
    putPasswordData: data => dispatch(actions.putPasswordData(data)),
    fetchPutPatient: (patientId, data) => dispatch(actions.fetchPutPatient(patientId, data)),
    fetchPasswordForm: (patientId, data) => dispatch(actions.fetchPasswordForm(patientId, data))
}))(SettingsSystemView));
