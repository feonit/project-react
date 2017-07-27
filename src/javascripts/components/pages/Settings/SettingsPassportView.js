import { Component, PropTypes } from 'react'
import translate from '../../../i18n/Translate'
import CustomForm from '../../modules/CustomForm/index'
import PassportForm from '../../modules/PassportForm'
import { Link } from 'react-router'
import GoBackButton from '../../modules/GoBackButton'
import {connect} from 'react-redux'
import * as actions from '../../../redux/actions/UserActions'
import ButtonSubmitForm from '../../modules/ButtonSubmitForm'

class SettingsPassportView extends Component{
    constructor(props){
        super(props)
        this.onBtnClick = this.onBtnClick.bind(this)
    }

    onBtnClick(event){
        event.preventDefault();
        return this.props.fetchPutPatient(this.props.patient.id, this.props.passportForm)
            .then( data => {
                this.context.router.push('/profile')
            })
    }

    render(){
        var trans = this.props.trans;
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
                            {trans.title}
                        </div>
                    </div>
                </section>
                <section className="info_section_block more_bot_pad">
                    <CustomForm onSubmit={this.onBtnClick}>
                        <div className="step_block_cell width_step270 mobile-none">
                            <div className="icon_graph left_pos passport_icon"></div>
                        </div>
    
                        <div className="mid_space_block">
                            <PassportForm/>
                            <div className="btn_placeholder">
                                <ButtonSubmitForm onClick={this.onBtnClick} type="submit" className="btn_style blue">Сохранить</ButtonSubmitForm>
                            </div>
                        </div>
                    </CustomForm>
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

SettingsPassportView.contextTypes = {
    router: PropTypes.object
}

export default translate('PassportPage')(connect((state)=>({
    patient: state.user.patient,
    passportForm: state.user.passportForm
}), dispatch => ({
    fetchPutPatient: (patientId, data) => dispatch(actions.fetchPutPatient(patientId, data))
}))(SettingsPassportView));