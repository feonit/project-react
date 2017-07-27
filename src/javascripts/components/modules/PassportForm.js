import { Component } from 'react'
import CustomInput from '../modules/CustomInput'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/UserActions'
import DateInput from '../modules/DateInput'
import CustomSelect from '../modules/CustomSelect/index'
import { PassportSchema, SexEnumLangRu, PassportTypesEnumLangRu, PASSPORT_DOCUMENT_TYPE } from '../../models/Patient'
import RawMaskedInput from './RawMaskedInput'
import translate from '../../i18n/Translate'

class PassportForm extends Component{
    constructor(props){
        super(props)
        this.onSurnameChange = this.onSurnameChange.bind(this)
        this.onSexChange = this.onSexChange.bind(this)
        this.onDocumentSerialChange = this.onDocumentSerialChange.bind(this)
        this.onGivenNameChange = this.onGivenNameChange.bind(this)
        this.onBirthDateChange = this.onBirthDateChange.bind(this)
        this.onDocumentNumberChange = this.onDocumentNumberChange.bind(this)
        this.onPatronymicChange = this.onPatronymicChange.bind(this)
        this.onDocumentTypeChange = this.onDocumentTypeChange.bind(this)
    }

    componentWillMount(){
        // предустановка значений из пациента todo 123: предустановки произвести в хранилище
        this.props.putPassportData({
            surname: this.props.patient.surname || this.props.passportForm.surname,
            sex: this.props.patient.sex || this.props.passportForm.sex,
            documentSerial: this.props.patient.documentSerial || this.props.passportForm.documentSerial,
            givenName: this.props.patient.givenName || this.props.passportForm.givenName,
            birthDate: this.props.patient.birthDate || this.props.passportForm.birthDate,
            documentNumber: this.props.patient.documentNumber || this.props.passportForm.documentNumber,
            patronymic: this.props.patient.patronymic || this.props.passportForm.patronymic,
            documentType: this.props.patient.documentType || this.props.passportForm.documentType,
        })
    }

    onSurnameChange(event){
        this.props.putPassportData({ surname: event.target.value });
    }
    onSexChange(event){
        this.props.putPassportData({ sex: event.target.value })
    }
    onDocumentSerialChange(event){
        this.props.putPassportData({ documentSerial: event.target.value.replace(' ', '')  })
    }
    onGivenNameChange(event){
        this.props.putPassportData({ givenName: event.target.value })
    }
    onBirthDateChange(event){
        this.props.putPassportData({ birthDate: event.target.value })
    }
    onDocumentNumberChange(event){
        this.props.putPassportData({ documentNumber: event.target.value.replace(' ', '') })
    }
    onPatronymicChange(event){
        this.props.putPassportData({ patronymic: event.target.value })
    }
    onDocumentTypeChange(event){
        this.props.putPassportData({ documentType: event.target.value })
    }

    componentDidUpdate(){
        // this.refs.surname.validate()
        // this.refs.givenName.validate()
        // this.refs.patronymic.validate()
    }

    render(){
        const transCodes = this.props.transCodes;

        return (
            <div>
                <div className="form_container_section no_pad">
                    <div className="step_block_cell width_step270">
                        <div className="input_placeholder">
                            <CustomInput
                                value={this.props.passportForm.surname}
                                ref="surname"
                                labelText={"Фамилия"}
                                errorText={transCodes[this.props.patientErrors.surname]}
                            >
                                <input
                                    onChange={this.onSurnameChange}
                                    value={this.props.passportForm.surname}
                                    type="text"
                                    className="text_input_style"
                                />
                            </CustomInput>
                        </div>
                        <div className="input_placeholder">
                            <CustomSelect
                                ref="sex"
                                title={transCodes[this.props.patientErrors.sex] || "Пол"}
                                items={Object.keys(SexEnumLangRu).map((item)=>{return {id: item, name: SexEnumLangRu[item]}})}
                                value={this.props.passportForm.sex}
                                onChange={this.onSexChange}
                            />
                        </div>
                    </div>
                    <div className="step_block_cell width_step270">
                        <div className="input_placeholder">
                            <CustomInput
                                value={this.props.passportForm.givenName}
                                ref="givenName"
                                labelText={"Имя"}
                                errorText={transCodes[this.props.patientErrors.givenName]}
                            >
                                <input
                                    onChange={this.onGivenNameChange}
                                    value={this.props.passportForm.givenName}
                                    type="text"
                                    className="text_input_style"
                                />
                            </CustomInput>
                        </div>
                        <div className="input_placeholder">
                            <CustomInput
                                ref="birthDate"
                                labelText={"Дата рождения"}
                                errorText={transCodes[this.props.patientErrors.birthDate]}
                            >
                                <DateInput
                                    name="birthDate"
                                    value={this.props.passportForm.birthDate}
                                    onChange={this.onBirthDateChange}
                                    placeholder=""
                                    className="text_input_style"
                                    required
                                />
                            </CustomInput>
                        </div>
                    </div>
                    <div className="step_block_cell width_step220">
                        <div className="input_placeholder">
                            <CustomInput
                                value={this.props.passportForm.patronymic}
                                ref="patronymic"
                                labelText={"Отчество"}
                                errorText={transCodes[this.props.patientErrors.patronymic]}
                            >
                                <input
                                    onChange={this.onPatronymicChange}
                                    value={this.props.passportForm.patronymic}
                                    type="text"
                                    className="text_input_style"
                                />
                            </CustomInput>
                        </div>
                        <div className="input_placeholder">
                            <CustomSelect
                                ref="documentType"
                                title={"Тип документа"}
                                errorText={transCodes[this.props.patientErrors.documentType]}
                                items={Object.keys(PassportTypesEnumLangRu).map((item)=>{return {id: item, name: PassportTypesEnumLangRu[item]}})}
                                value={this.props.passportForm.documentType}
                                onChange={this.onDocumentTypeChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="form_container_section">
                    {this.props.passportForm.documentType !== PASSPORT_DOCUMENT_TYPE? (
                        ''
                    ) : (
                        <div className="step_block_cell width_step270">
                            <div className="input_placeholder">
                                <CustomInput
                                    ref="documentSerial"
                                    labelText={"Серия"}
                                    errorText={transCodes[this.props.patientErrors.documentSerial]}
                                    value={this.props.passportForm.documentSerial}
                                >
                                    <RawMaskedInput
                                        mask="11 11"
                                        placeholder="00 00"
                                        placeholderChar=" "
                                        name="series"
                                        value={this.props.passportForm.documentSerial}
                                        onChange={this.onDocumentSerialChange}
                                        type="text"
                                        className="text_input_style"
                                        required
                                    />
                                </CustomInput>
                            </div>
                        </div>
                    )
                    }

                    {this.props.passportForm.documentType !== PASSPORT_DOCUMENT_TYPE? (
                        <div className="step_block_cell width_step270">
                            <div className="input_placeholder">
                                <CustomInput
                                    ref="documentNumber"
                                    labelText={"Другое"}
                                    errorText={transCodes[this.props.patientErrors.documentNumber]}
                                >
                                    <RawMaskedInput
                                        name="documentNumber"
                                        value={this.props.passportForm.documentNumber}
                                        onChange={this.onDocumentNumberChange}
                                        type="text"
                                        mask="111111"
                                        placeholder="000000"
                                        placeholderChar=" "
                                        className="text_input_style"
                                        required
                                    />
                                </CustomInput>
                            </div>
                        </div>
                    ) : (
                        <div className="step_block_cell width_step270">
                            <div className="input_placeholder">
                                <CustomInput
                                    ref="documentNumber"
                                    labelText={"Номер"}
                                    errorText={transCodes[this.props.patientErrors.documentNumber]}
                                >
                                    <RawMaskedInput
                                        name="documentNumber"
                                        value={this.props.passportForm.documentNumber}
                                        onChange={this.onDocumentNumberChange}
                                        type="text"
                                        mask="111111"
                                        placeholder="000000"
                                        placeholderChar=" "
                                        className="text_input_style"
                                        required
                                    />
                                </CustomInput>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
        )
    }
}

PassportForm.propTypes = {
    passportForm: PropTypes.shape(PassportSchema)
}

PassportForm.displayName = "PassportForm"

export default translate("PassportForm")(connect(
    state => ({
        patient: state.user.patient,
        patientErrors: state.user.patientErrors,
        passportForm: state.user.passportForm
    }),
    dispatch => ({
        putPassportData: function(data){
            dispatch(actions.putPassportData(data))
        }
    })
)(PassportForm));

