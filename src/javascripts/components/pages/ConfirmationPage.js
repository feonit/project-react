import { Component, PropTypes } from 'react'
import CustomInput from '../modules/CustomInput'
import translate from '../../i18n/Translate'
import GoBackButton from '../modules/GoBackButton'
import { Link } from 'react-router'
import FormBlocking from '../modules/FormBlocking'
import SubmitButton from '../modules/SubmitButton'
import ConfirmPageModes from '../../enums/ConfirmPageModes'
import { connect } from 'react-redux'
import { fetchRehash, fetchConfirm, putConfirmFormData, receiveConfirm, failureConfirm, receiveRehash, failureRehash } from '../../redux/actions/AuthActions'
import ConfirmData from '../../models/ConfirmData'
import ConfirmErrorData from '../../models/ConfirmErrorData'

class ConfirmationPage extends Component{
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeCode = this.onChangeCode.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangePasswordRepeat = this.onChangePasswordRepeat.bind(this)
        this.onRepeatBtnClick = this.onRepeatBtnClick.bind(this)
    }

    componentDidMount(){
        this.props.putConfirmFormData({linkId: this.props.routeParams.linkId});
    }

    onSubmit(event){
        event.preventDefault();
        return this.props.fetchConfirm({
            ...this.props.confirmData,
            linkId: this.props.routeParams.linkId
        })
            .then( data => {
                this.props.receiveConfirm(data);
                this.context.router.push('/calendar');
            }, errors => {
                this.props.failureConfirm(errors)
                this.props.putConfirmFormData({code: '', password: '', passwordRepeat: ''});
            })
    }
    
    componentWillUnmount(){
        this.props.putConfirmFormData({code: '', password: '', passwordRepeat: ''});
    }

    onChangeCode(event){
        this.props.putConfirmFormData({code: event.target.value});
    }

    onChangePassword(event){
        this.props.putConfirmFormData({password: event.target.value});
    }

    onChangePasswordRepeat(event){
        this.props.putConfirmFormData({passwordRepeat: event.target.value});
    }

    onRepeatBtnClick(event){
        this.props.fetchRehash(this.props.routeParams.linkId)
            .then( data => {
                this.props.receiveRehash(data);

                this.context.router.replace('/confirm/register/' + data.link);
            }, errors => {
                this.props.failureRehash(errors);
            })
    }
    
    render(){
        var trans = this.props.trans;
        var transCodes = this.props.transCodes;

        var titleRegisterPage = (
            <span>
                Осталось активировать учетную запись и придумать <br />
                пароль. СМС с кодом активации выслан на указанный <br />
                номер, копия — на электронную почту.
            </span>
        );
        var titlePasswordPage = (
            <span>
                Осталось подтвердить изменение пароля и придумать новый <br />
                пароль. СМС с кодом активации выслан на указанный <br />
                номер, копия — на электронную почту.
            </span>
        );
        var title = this.props.confirmMode == 'register' ? titleRegisterPage : titlePasswordPage;

        return (
            <div className="static_overflow">
                <div className="bg_overflow right_position login_doc_image mobile-left_position"></div>
                <div className="main_content mobile-reg_page">
                    <FormBlocking onSubmit={this.onSubmit} autoComplete="off" disabled={this.props.confirmIsLoading}>
                        <div className="white_mask mobile-reg_mask">
                            <section className="full_line_section">
                                <div className="left_angle_block">
                                    <GoBackButton/>
                                </div>
                                <div className="mid_angle_block">
                                    <div className="icon_graph phone_icon"></div>
                                    <section className="header_main_section mobile-reg_page">
                                        <div className="header_name arrow_line mobile-reg_header">
                                            <Link className="top_line_left" to="/calendar">telemed.</Link>
                                        </div>
                                        <div className="med_font_description mobile-show">Система телемедицины.</div>
                                    </section>
                                    <div className="med_font_description">
                                        { title }
                                    </div>
                                    <section className="form_container_section">
                                        <section className="step_block_cell width_step270">
                                            <div className="input_placeholder">
                                                <CustomInput
                                                    ref="code"
                                                    errorText={transCodes[this.props.confirmErrors.code]}
                                                    labelText={trans.register_activate_code}
                                                >
                                                    <input
                                                        type="password"
                                                        onChange={this.onChangeCode}
                                                        value={this.props.confirmData.code}
                                                        className="text_input_style"
                                                        id="code"
                                                    />
                                                </CustomInput>
                                            </div>
                                        </section>
                                        <section className="step_block_cell width_step270 clear_left">
                                            <div className="input_placeholder">
                                                <CustomInput
                                                    ref="password"
                                                    errorText={transCodes[this.props.confirmErrors.password]}
                                                    labelText={"Придумайте пароль"}
                                                >
                                                    <input
                                                        type="password"
                                                        onChange={this.onChangePassword}
                                                        value={this.props.confirmData.password}
                                                        className="text_input_style"
                                                        id="password"
                                                    />
                                                </CustomInput>
                                            </div>
                                        </section>
                                        <section className="step_block_cell width_step220">
                                            <div className="input_placeholder">
                                                <CustomInput
                                                    ref="passwordRepeat"
                                                    errorText={transCodes[this.props.confirmErrors.passwordRepeat]}
                                                    labelText={"Повторите пароль"}
                                                >
                                                    <input
                                                        type="password"
                                                        onChange={this.onChangePasswordRepeat}
                                                        value={this.props.confirmData.passwordRepeat}
                                                        className="text_input_style"
                                                        id="passwordRepeat"
                                                    />
                                                </CustomInput>
                                            </div>
                                        </section>
                                        <section className="step_block_cell width_step270 clear_left">
                                            <div className="med_font_description pad_bot_small">
                                                <div>Ничего не приходит?</div>
                                                <div>
                                                    <button className="link_button" onClick={this.onRepeatBtnClick} type="button">Выслать код повторно</button>
                                                </div>
                                            </div>
                                        </section>
                                        <section className="step_block_cell width_step220">
                                            <div className="btn_placeholder right_align_pos">
                                                <SubmitButton isLoading={this.props.confirmIsLoading}>
                                                    Активировать
                                                </SubmitButton>
                                            </div>
                                        </section>
                                    </section>
                                </div>
                            </section>
                        </div>
                    </FormBlocking>
                    <div className="bot_icon_container">
                        <a href="/index">
                            <div className="small_icon_bot"></div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

ConfirmationPage.contextTypes = {
    router: PropTypes.object
}

ConfirmationPage.propTypes = {
    confirmData: PropTypes.instanceOf(ConfirmData),
    confirmErrors: PropTypes.instanceOf(ConfirmErrorData),
    fetchRehash: PropTypes.func.isRequired,
    fetchConfirm: PropTypes.func.isRequired,
    putConfirmFormData: PropTypes.func.isRequired,
    receiveConfirm: PropTypes.func.isRequired,
    failureConfirm: PropTypes.func.isRequired,
    failureRehash: PropTypes.func.isRequired,
    receiveRehash: PropTypes.func.isRequired,
    routeParams: PropTypes.shape({
        linkId: PropTypes.string.isRequired,
        confirmMode: PropTypes.oneOf(ConfirmPageModes).isRequired
    }).isRequired
}
export default translate('ConfirmationRegistrationPage')(connect( 
    state => ({
        confirmData: state.auth.confirmData,
        confirmIsLoading: state.auth.confirmIsLoading,
        confirmErrors: state.auth.confirmErrors
    }),
    dispatch => ({
        fetchRehash: linkId => dispatch(fetchRehash(linkId)),
        fetchConfirm: data => dispatch(fetchConfirm(data)),
        putConfirmFormData: data => dispatch(putConfirmFormData(data)),
        failureConfirm: errors => dispatch(failureConfirm(errors)),
        receiveConfirm: data => dispatch(receiveConfirm(data)),
        failureRehash: errors => dispatch(failureRehash(errors)),
        receiveRehash: data => dispatch(receiveRehash(data)),
    })
)(ConfirmationPage));

