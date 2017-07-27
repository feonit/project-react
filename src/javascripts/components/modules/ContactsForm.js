import { Component } from 'react'
import { Link } from 'react-router'
import CustomInput from '../modules/CustomInput'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/UserActions'
import PhoneInput from '../modules/PhoneInput'
import translate from '../../i18n/Translate'

class CustomForm extends Component{
    constructor(props){
        super(props)
        this.onAdditionalPhoneChange = this.onAdditionalPhoneChange.bind(this)
        this.onMobilePhoneChange = this.onMobilePhoneChange.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
    }

    componentWillMount(){
        // предустановка значений из пациента todo 123: предустановки произвести в хранилище
        this.props.putDataToStore({
            mobilePhone: this.props.patient.mobilePhone || this.props.contactsForm.mobilePhone,
            additionalPhone: this.props.patient.additionalPhone || this.props.contactsForm.additionalPhone,
            email: this.props.patient.email || this.props.contactsForm.email
        })
    }

    onMobilePhoneChange(event){
        this.props.putDataToStore({ mobilePhone: event.target.value })
    }

    onAdditionalPhoneChange(event){
        this.props.putDataToStore({ additionalPhone: event.target.value })
    }

    onEmailChange(event){
        this.props.putDataToStore({ email: event.target.value })
    }

    render(){
        const transCodes = this.props.transCodes;
        return (
            <div className="form_container_section">
                <section className="step_block_cell width_step270">
                    <div className="input_placeholder">
                        <CustomInput
                            ref="mobilePhone"
                            labelText={"Мобильный телефон"}
                            errorText={transCodes[this.props.patientErrors.mobilePhone]}
                        >
                            <PhoneInput
                                autoComplete="off"
                                value={this.props.contactsForm.mobilePhone}
                                onChange={this.onMobilePhoneChange}
                                className="text_input_style"
                            />
                        </CustomInput>
                    </div>
                </section>
                <section className="step_block_cell width_step270">
                    <div className="input_placeholder">
                        <CustomInput
                            ref="additionalPhone"
                            labelText={"Дополнительный телефон"}
                            errorText={transCodes[this.props.patientErrors.additionalPhone]}
                        >
                            <PhoneInput
                                autoComplete="off"
                                value={this.props.contactsForm.additionalPhone}
                                onChange={this.onAdditionalPhoneChange}
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
                            errorText={transCodes[this.props.patientErrors.email]}
                        >
                            <input
                                autoComplete="off"
                                value={this.props.contactsForm.email}
                                onChange={this.onEmailChange}
                                className="text_input_style"
                            />
                        </CustomInput>
                    </div>
                </section>
            </div>
        )
    }
}
export default translate("ContactsForm")(connect( 
    state => ({
        patient: state.user.patient,
        patientErrors: state.user.patientErrors,
        contactsForm: state.user.contactsForm
    }), 
    dispatch => ({
        putDataToStore: data => dispatch(actions.putContactsData(data))
    })
)(CustomForm));