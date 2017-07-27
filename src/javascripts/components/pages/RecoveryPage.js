import { Component, PropTypes } from 'react'
import SNILSInput from '../modules/SNILSInput'
import PhoneInput from '../modules/PhoneInput'
import CustomInput from '../modules/CustomInput'
import FormBlocking from '../modules/FormBlocking'
import translate from '../../i18n/Translate'
import { Link } from 'react-router'
import GoBackButton from '../modules/GoBackButton'
import { connect } from 'react-redux'
import { putRecoveryFormData, fetchRecovery, receiveRecovery, failureRecovery } from '../../redux/actions/AuthActions'
import SubmitButton from '../modules/ButtonSubmitForm'
import makeCancelable from '../../2015/promise/makeCancelable'
import RecoveryData from '../../models/RecoveryData'
import RecoveryErrorData from '../../models/RecoveryErrorData'

class RecoveryPage extends Component{
    constructor(props){
        super(props)
        this.cancelablePromise = null;
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onPhoneChange = this.onPhoneChange.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onSNILSChange = this.onSNILSChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillUnmount(){
        this.props.putRecoveryFormData({snils: "", mobilePhone: "", email: ""});
    }

    onSNILSChange(event){
        this.props.putRecoveryFormData({snils: event.target.value});
    }

    onPhoneChange(event){
        this.props.putRecoveryFormData({mobilePhone: event.target.value});
    }

    onEmailChange(event){
        this.props.putRecoveryFormData({email: event.target.value});
    }

    onSubmit(event){
        event.preventDefault();
        let promise = this.props.fetchRecovery(this.props.recoveryData)
        this.cancelablePromise = new makeCancelable(promise)
        
        return this.cancelablePromise
            .promise
            .then( data => {
                this.props.receiveRecovery(data)
                this.context.router.push('/confirm/password/' + data.link);
            }, errors => {
                this.props.failureRecovery(errors)
            })
    }
    
    render(){
        var trans = this.props.trans;
        var transCodes = this.props.transCodes;

        return (
            <FormBlocking onSubmit={this.onSubmit} disabled={this.props.recoveryIsLoading}>
                <div className="static_overflow">
                    <div className="bg_overflow right_position login_doc_image mobile-left_position"></div>
                    <div className="main_content mobile-reg_page">
                        <div className="white_mask mobile-reg_mask">
                            <section className="full_line_section">
                                <div className="left_angle_block">
                                    <GoBackButton/>
                                </div>
                                <div className="mid_angle_block">
                                    <div className="icon_graph restore_icon mobile-reg_page"></div>
                                    <section className="header_main_section mobile-reg_page">
                                        <div className="header_name arrow_line mobile-reg_header">
                                            <Link className="top_line_left" to="/calendar">telemed.</Link>
                                        </div>
                                        <div className="med_font_description mobile-show">Система телемедицины.</div>
                                    </section>
                                    <section className="form_container_section">
                                        <div className="med_font_description pad_bot_small">
                                            Для восстановления доступа укажите <br />
                                            СНИЛС, а также мобильный телефон или <br />
                                            электронную почту.
                                        </div>
                                        <section className="step_block_cell width_step270">
                                            <div className="input_placeholder">
                                                <CustomInput
                                                    ref="snils"
                                                    labelText={"Номер СНИЛС"}
                                                    errorText={transCodes[this.props.recoveryErrors.snils]}
                                                    placeholderMask="0000 0000 000">
                                                    <SNILSInput
                                                        id="snils"
                                                        type="text"
                                                        value={this.props.recoveryData.snils}
                                                        onChange={this.onSNILSChange}
                                                        className="text_input_style"
                                                    />
                                                </CustomInput>
                                            </div>
                                        </section>
                                        <section className="step_block_cell width_step270">
                                            <div className="input_placeholder">
                                                <CustomInput
                                                    ref="mobilePhone"
                                                    labelText={"Мобильный телефон"}
                                                    errorText={transCodes[this.props.recoveryErrors.mobilePhone]}
                                                >
                                                    <PhoneInput
                                                        id="password"
                                                        type="text"
                                                        value={this.props.recoveryData.mobilePhone}
                                                        onChange={this.onPhoneChange}
                                                        className="text_input_style"
                                                    />
                                                </CustomInput>
                                            </div>
                                        </section>
                                        <section className="step_block_cell width_step220">
                                            <div className="input_placeholder">
                                                <CustomInput
                                                    ref="email"
                                                    labelText={"Электронная почта"}
                                                    errorText={transCodes[this.props.recoveryErrors.email]}
                                                >
                                                    <input
                                                        id="email"
                                                        type="text"
                                                        value={this.props.recoveryData.email}
                                                        onChange={this.onEmailChange}
                                                        className="text_input_style"
                                                    />
                                                </CustomInput>
                                            </div>
                                        </section>
                                    </section>

                                    <div className="btn_placeholder right_align_pos">
                                        <SubmitButton type="submit" className="btn_style" isLoading={this.props.recoveryIsLoading}>Восстановить</SubmitButton>
                                    </div>
                                </div>
                            </section>

                            <div className="bot_icon_container">
                                <Link to="/index">
                                    <div className="small_icon_bot"></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </FormBlocking>
        );
    }
}

RecoveryPage.contextTypes = {
    router: PropTypes.object
}

RecoveryPage.propTypes = {
    recoveryData: PropTypes.instanceOf(RecoveryData),
    recoveryErrors: PropTypes.instanceOf(RecoveryErrorData),
    failureRecovery: PropTypes.func.isRequired,
    receiveRecovery: PropTypes.func.isRequired,
    fetchRecovery: PropTypes.func.isRequired,
    putRecoveryFormData: PropTypes.func.isRequired,
    recoveryIsLoading: PropTypes.bool
}

export default translate('RecoveryPage')(connect(
    state => ({
        recoveryErrors: state.auth.recoveryErrors,
        recoveryIsLoading: state.auth.recoveryIsLoading,
        recoveryData: state.auth.recoveryData
    }),
    dispatch => ({
        putRecoveryFormData: data => dispatch(putRecoveryFormData(data)),
        fetchRecovery: data => dispatch(fetchRecovery(data)),
        receiveRecovery: data => dispatch(receiveRecovery(data)),
        failureRecovery: errors => dispatch(failureRecovery(errors)),
    }))
(RecoveryPage));
