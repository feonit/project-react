import { Component, PropTypes } from 'react'
import classNames from 'classnames'
import SNILSInput from '../../modules/SNILSInput'
import PhoneInput from '../../modules/PhoneInput'
import CustomInput from '../../modules/CustomInput'
import translate from '../../../i18n/Translate'
import ReCaptcha from './ReCaptcha/index'
import { Link } from 'react-router'
import FormBlocking from '../../modules/FormBlocking'
import GoBackButton from '../../modules/GoBackButton'
import SubmitButton from '../../modules/SubmitButton'
import RegisterData from '../../../models/RegisterData'
import RegisterErrorData from '../../../models/RegisterErrorData'

import { connect } from 'react-redux'
import { putRegisterData, fetchRegister, receiveRegisterSuccess, receiveRegisterFailure } from '../../../redux/actions/AuthActions'
import makeCancelable from '../../../2015/promise/makeCancelable'

class RegisterPage extends Component{
    constructor(props){
        super(props)
        this.cancelablePromise = null;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePatronymicChange = this.handlePatronymicChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleSnilsChange = this.handleSnilsChange.bind(this);
        this.handleVerifyRecaptcha = this.handleVerifyRecaptcha.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        let promise = this.props.fetchRegister(this.props.registerData)
        this.cancelablePromise = new makeCancelable(promise)

        return this.cancelablePromise
            .promise
            .then( data => {
                this.props.receiveRegisterSuccess(data)
                this.context.router.push('/confirm/register/' + data.link);
            }, errors => {
                this.props.receiveRegisterFailure(errors)
                // grecaptcha.reset(); не удалять
            })
    }

    componentWillUnmount(){
        if (this.cancelablePromise){
            this.cancelablePromise.cancel();
        }
        this.props.putRegisterData({surname: "", givenName: "", patronymic: "", mobilePhone: "", snils: "", email: "", recaptcha: "" })
    }

    handleSurnameChange(event){
        this.props.putRegisterData({surname: event.target.value.trim()});
    }
    handleNameChange(event){
        this.props.putRegisterData({givenName: event.target.value.trim()});
    }
    handlePatronymicChange(event){
        this.props.putRegisterData({patronymic: event.target.value.trim()});
    }
    handlePhoneChange(event){
        this.props.putRegisterData({mobilePhone: event.target.value.trim()});
    }
    handleSnilsChange(event){
        this.props.putRegisterData({snils: event.target.value.trim()});
    }
    handleVerifyRecaptcha(value){
        this.props.putRegisterData({recaptcha: value});
    }
    handleEmailChange(event){
        this.props.putRegisterData({email: event.target.value.trim()});
    }

    render(){
        var trans = this.props.trans;
        var transCodes = this.props.transCodes;

        return (
            <div className="static_overflow">
                <div className="bg_overflow right_position login_doc_image mobile-left_position"></div>
                <div className="main_content mobile-reg_page">
                    <FormBlocking onSubmit={this.handleSubmit} disabled={this.props.registerIsLoading}>
                        <div className="white_mask mobile-reg_mask">
                            <section className="full_line_section">
                                <div className="left_angle_block">
                                    <GoBackButton/>
                                </div>
                                <div className="mid_angle_block">
                                    <section className="header_main_section mobile-reg_page">
                                        <div className="right_angle_icon">
                                            <div className="icon_graph register_icon"></div>
                                        </div>
                                        <div className="header_name arrow_line mobile-reg_header">
                                            <Link className="top_line_left" to="/calendar">telemed.</Link>
                                        </div>
                                        <div className="med_font_description mobile-show">Система телемедицины.</div>
                                    </section>
                                    <section className="form_container_section">
                                        <section className="step_block_cell width_step270">
                                            <div className="input_placeholder">
                                                <CustomInput
                                                    ref="surname"
                                                    labelText={trans.surname}
                                                    errorText={transCodes[this.props.registerErrors.surname]}
                                                >
                                                    <input
                                                        id="surname"
                                                        type="text"
                                                        tabIndex="1"
                                                        value={this.props.registerData.surname}
                                                        onChange={this.handleSurnameChange}
                                                        className="text_input_style"
                                                    />
                                                </CustomInput>
                                            </div>
                                            <div className="input_placeholder">
                                                <CustomInput
                                                    ref="snils"
                                                    labelText={trans.snils}
                                                    errorText={transCodes[this.props.registerErrors.snils]}
                                                >
                                                    <SNILSInput
                                                        id="snils"
                                                        tabIndex="4"
                                                        value={this.props.registerData.snils}
                                                        onChange={this.handleSnilsChange}
                                                        className="text_input_style"
                                                        type="text"
                                                    />
                                                </CustomInput>
                                            </div>
                                        </section>
                                        <section className="step_block_cell width_step270">
                                            <div className="input_placeholder">
                                                <CustomInput
                                                    ref="givenName"
                                                    labelText={trans.givenName}
                                                    errorText={transCodes[this.props.registerErrors.givenName]}
                                                >
                                                    <input
                                                        id="givenName"
                                                        tabIndex="2"
                                                        type="text"
                                                        value={this.props.registerData.givenName}
                                                        onChange={this.handleNameChange}
                                                        className="text_input_style"
                                                    />
                                                </CustomInput>
                                            </div>
                                            <div className="input_placeholder">
                                                <CustomInput
                                                    ref="mobilePhone"
                                                    labelText={trans.phone}
                                                    errorText={transCodes[this.props.registerErrors.mobilePhone]}
                                                >
                                                    <PhoneInput
                                                        id="mobilePhone"
                                                        tabIndex="5"
                                                        value={this.props.registerData.mobilePhone}
                                                        onChange={this.handlePhoneChange}
                                                        className="text_input_style"
                                                        type="text"
                                                    />
                                                </CustomInput>
                                            </div>
                                        </section>
                                        <section className="step_block_cell width_step270">
                                            <div className="input_placeholder">
                                                <CustomInput
                                                    ref="patronymic"
                                                    labelText={trans.patronymic}
                                                    errorText={transCodes[this.props.registerErrors.patronymic]}
                                                >
                                                    <input
                                                        id="patronymic"
                                                        tabIndex="3"
                                                        type="text"
                                                        value={this.props.registerData.patronymic}
                                                        onChange={this.handlePatronymicChange}
                                                        className="text_input_style"
                                                    />
                                                </CustomInput>
                                            </div>
                                            <div className="input_placeholder">
                                                <CustomInput
                                                    ref="email"
                                                    labelText={trans.email}
                                                    errorText={transCodes[this.props.registerErrors.email]}
                                                >
                                                    <input
                                                        id="email"
                                                        tabIndex="6"
                                                        type="text"
                                                        value={this.props.registerData.email}
                                                        onChange={this.handleEmailChange}
                                                        className="text_input_style"
                                                    />
                                                </CustomInput>
                                            </div>
                                        </section>
                                    </section>

                                    {
                                        /*
                                         <section className="after_form_block">
                                         <div className="step_block_cell width_step270">
                                         <div className={ classNames({"g-recaptcha-error": this.props.recaptchaHasError})}>
                                         <ReCaptcha onVerify={this.handleVerifyRecaptcha} />
                                         </div>
                                         <p>{// g-recaptcha-response}</p>
                                         </div>
                                         </section>
                                         */
                                    }

                                    <div className="btn_placeholder">
                                        <div className="right_btn_block">
                                            <SubmitButton isLoading={this.props.registerIsLoading}>
                                                Продолжить
                                            </SubmitButton>
                                        </div>
                                        <div className="left_btn_description">
                                            <span>Регистрируясь на сайте, вы соглашаетесь <br/>с </span><Link to="/agreement">условиями пользования сайтом</Link>
                                        </div>

                                    </div>
                                </div>
                            </section>

                            <div className="bot_icon_container">
                                <Link to="/index">
                                    <div className="small_icon_bot"></div>
                                </Link>
                            </div>
                        </div>
                    </FormBlocking>
                </div>
            </div>
        );
    }
}

RegisterPage.propTypes = {
    registerData: PropTypes.instanceOf(RegisterData),
    registerErrors: PropTypes.instanceOf(RegisterErrorData),
    putRegisterData: PropTypes.func.isRequired,
    fetchRegister: PropTypes.func.isRequired,
    receiveRegisterSuccess: PropTypes.func.isRequired,
    receiveRegisterFailure: PropTypes.func.isRequired,
    registerIsLoading: PropTypes.bool
}

RegisterPage.contextTypes = {
    router: PropTypes.object
}

export default translate('RegisterPage')(connect(
    state => ({
        registerData: state.auth.registerData,
        registerErrors: state.auth.registerErrors,
        registerIsLoading: state.auth.registerIsLoading
    }),
    dispatch => ({
        putRegisterData: data => dispatch(putRegisterData(data)),
        fetchRegister: data => dispatch(fetchRegister(data)),
        receiveRegisterSuccess: data => dispatch(receiveRegisterSuccess(data)),
        receiveRegisterFailure: errors => dispatch(receiveRegisterFailure(errors)),
    })
)(RegisterPage));


