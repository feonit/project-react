import { Component, PropTypes } from 'react'
import SNILSInput from '../modules/SNILSInput'
import LanguagePicker from '../modules/LanguagePicker'
import CustomInput from '../modules/CustomInput'
import translate from '../../i18n/Translate'
import { Link } from 'react-router'
import FormBlocking from '../modules/FormBlocking'
import SubmitButton from '../modules/SubmitButton'
import {connect} from 'react-redux'
import { putLoginForm, fetchLogin, receiveLoginData, invalidData, resetLoginErrors } from '../../redux/actions/AuthActions'
import LoginDataValidation from '../../models/LoginDataValidation'
import LoginData from '../../models/LoginData'
import LoginErrorData from '../../models/LoginErrorData'
import makeCancelable from '../../2015/promise/makeCancelable'

class LoginPage extends Component{
    constructor(props){
        super(props)
        this.cancelablePromise = null
        this.onLoginChange = this.onLoginChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onLoginChange(event){
        this.props.putLoginForm({login: event.target.value.trim()})
    }

    onPasswordChange(event){
        this.props.putLoginForm({password: event.target.value.trim()})
    }

    onSubmit(event){
        event.preventDefault();
        let promise = this.props.onLoginSubmit(this.props.loginData)
        this.cancelablePromise = makeCancelable(promise)
        return this.cancelablePromise.promise
            .then(data => {
                this.props.resetErrors()
                this.props.putLoginForm({password: "", login: ""});
                this.props.receiveLoginData(data)
            }, errors => {
                this.props.invalidData(errors)
            })
    }

    componentWillUnmount(){
        this.props.resetErrors()
        this.props.putLoginForm({password: "", login: ""});
        if (this.cancelablePromise){
            this.cancelablePromise.cancel();
        }
    }
    
    render(){
        var trans = this.props.trans;
        var transCodes = this.props.transCodes;

        return (
            <div className="static_overflow">
                <div className="bg_overflow mid_position login_doc_image"></div>
                <div className="white_mask login_block">
                    <div className="header_name">telemed.</div>
                    <FormBlocking onSubmit={this.onSubmit} disabled={this.props.loginIsLoading}>
                        <section className="step_block_cell">
                            <div className="med_font_description">{trans.title}.</div>
                            <div className="med_font_description mobile-none">
                                <p>
                                    <Link className="link_button" to="/register">{trans.register_new_user_link}</Link>
                                </p>
                                <p>
                                    <Link className="link_button" to="/password">{trans.remind_password}</Link>
                                </p>
                            </div>
                            <div className="med_font_description mobile-none">
                                <p>
                                    <LanguagePicker/>
                                </p>
                            </div>
                            <div className="bot_icon_container mobile-none">
                                <Link to="/index">
                                    <div className="small_icon_bot"></div>
                                </Link>
                            </div>
                        </section>
                        <section className="step_block_cell width_step250">
                            <div className="input_placeholder">
                                <CustomInput
                                    ref="login"
                                    labelText={trans.login}
                                    errorText={transCodes[this.props.loginErrors.login]}
                                >
                                    <input
                                        id="login"
                                        autoComplete="off"
                                        value={this.props.loginData.login}
                                        onChange={this.onLoginChange}
                                        className="text_input_style"
                                    />
                                </CustomInput>
                            </div>
                            <div className="input_placeholder">
                                <CustomInput
                                    ref="password"
                                    labelText={trans.password}
                                    errorText={transCodes[this.props.loginErrors.password]}
                                >
                                    <input
                                        id="password"
                                        type="password"
                                        value={this.props.loginData.password}
                                        autoComplete="off"
                                        onChange={this.onPasswordChange}
                                        className="text_input_style"
                                    />
                                </CustomInput>
                            </div>
                            <div>
                                <SubmitButton disabled={this.props.submitDisabled} isLoading={this.props.loginIsLoading}>
                                    {trans.login_button}
                                </SubmitButton>
                            </div>
                        </section>
                    </FormBlocking>
                </div>
            </div>
        )
    }
}

LoginPage.propTypes = {
    loginErrors: PropTypes.instanceOf(LoginErrorData),
    loginData: PropTypes.instanceOf(LoginData),
    loginIsLoading: PropTypes.bool,
    submitDisabled: PropTypes.bool,
    resetErrors: PropTypes.func.isRequired,
    putLoginForm: PropTypes.func.isRequired,
    onLoginSubmit: PropTypes.func.isRequired,
    invalidData: PropTypes.func.isRequired,
    receiveLoginData: PropTypes.func.isRequired,
}

export default translate('LoginPage')(connect(
    state => {
        let { isValid } = (new LoginDataValidation).validate(state.auth.loginData)
        return ({
            loginErrors: state.auth.loginErrors,
            loginData: state.auth.loginData,
            loginIsLoading: state.auth.loginIsLoading,
            submitDisabled: !isValid
        })
    }, 
    dispatch => ({
        putLoginForm: data => dispatch(putLoginForm(data)),
        onLoginSubmit: data => dispatch(fetchLogin(data)),
        receiveLoginData: data => dispatch(receiveLoginData(data)),
        invalidData: errors => dispatch(invalidData(errors)),
        resetErrors: () => dispatch(resetLoginErrors())
    }))
(LoginPage));

