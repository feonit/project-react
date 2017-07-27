import { Component, PropTypes } from 'react'
import CustomInput from '../modules/CustomInput'
import CustomForm from '../modules/CustomForm'
import GoBackButton from '../modules/GoBackButton'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/UserActions'
import ButtonSubmitForm from '../modules/ButtonSubmitForm'

class FeedbackPage extends Component{
    constructor(props){
        super(props)
        this.onTextChange = this.onTextChange.bind(this)
        this.onSubmitClick = this.onSubmitClick.bind(this)
    }

    onTextChange(event){
        this.props.change(event.target.value)
    }
    
    onSubmitClick(event){
        event.preventDefault();
        // var regexp = /\w/;
        // if (regexp.test(this.props.feedbackMessage)){
        return this.props.submit(this.props.patient.id, this.props.feedbackMessage)
            .then(()=>{
                this.props.change("")
                this.context.router.push('/calendar')
            })
            .catch((err)=>{
                throw err;
            })
        // } else {
        //     return Promise.resolve()
        // }
    }

    render(){
        return (
            <CustomForm onSubmit={this.onSubmitClick} className="main_content">
                <section className="full_profile_header">
                    <div className="left_angle_block">
                        <GoBackButton/>
                    </div>
                    <div className="mid_header_block">
                        <Link title="Профиль" to="/profile" className="profile_item_block"></Link>
                        <Link className="top_line_left" to="/calendar">telemed.</Link>
                        <span className="head_line_border"></span>
                        <span className="top_line_left">Профиль</span>
                    </div>
                </section>
                <section className="info_section_block">
                    <div className="step_block_cell left_small_step">
                        <div className="header_name">Задать вопрос</div>
                    </div>
                </section>
                <section className="info_section_block">
                    <section className="form_container_section">
                        <div className="step_block_cell width_step270 mobile-none">
                            <div className="icon_graph left_pos feedback_icon"></div>
                        </div>
                        <div className="step_block_cell width_step270 double_column">
                            <div className="input_placeholder doble_size">
                                <CustomInput labelText="Текст вопроса">
                                    <input
                                        value={this.props.feedbackMessage}
                                        onChange={this.onTextChange}
                                        className="text_input_style"
                                        type="text"
                                    />
                                </CustomInput>
                            </div>
                            <div className="btn_placeholder">
                                <ButtonSubmitForm
                                    disabled={!this.props.isValid}
                                    onClick={this.onSubmitClick}
                                    className="btn_style"
                                    type="button"
                                >
                                    Отправить
                                </ButtonSubmitForm>
                            </div>
                        </div>
                    </section>
                </section>
                <div className="main_foot_info">
                    <div className="copy_right">Nephrology Expert Council</div>
                    <Link className="link_foot_style" to="/feedback">Помощь</Link>
                    <Link className="link_foot_style" to="/agreement">Правовая информация</Link>
                    <Link className="link_foot_style" to="/about">О сайте</Link>
                </div>

                <div className="bot_icon_container">
                    <Link to="/index">
                        <div className="small_icon_bot"></div>
                    </Link>
                </div>

            </CustomForm>
        );
    }
}

FeedbackPage.contextTypes = {
    router: PropTypes.object
}

export default connect(
    state => ({
        patient: state.user.patient,
        feedbackMessage: state.user.feedbackMessage,
        isValid: !!state.user.feedbackMessage
    }),
    dispatch => ({
        change: message => dispatch(actions.changeFeedbackMessage(message)),
        submit: (patientId, message) => dispatch(actions.submitFeedbackMessage(patientId, message))
    })
)(FeedbackPage);
