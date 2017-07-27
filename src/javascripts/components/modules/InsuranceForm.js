import { Component } from 'react'
import CustomInput from '../modules/CustomInput'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/UserActions'
import {InsuranceTypeLangRu, INSURANCE_TEMPORARY_TYPE} from '../../models/Patient'
import DateInput from '../modules/DateInput'
import PreloaderView from '../modules/PreloaderView'
import CustomSelect from '../modules/CustomSelect/index'
import RawMaskedInput from './RawMaskedInput'
import translate from '../../i18n/Translate'

class InsuranceForm extends Component{
    constructor(props){
        super(props)
        this.state = { loaded: false }
        this.onInsurancePolicyTypeChange = this.onInsurancePolicyTypeChange.bind(this)
        this.onRegionChange = this.onRegionChange.bind(this)
        this.onInsuranceCompanyCodeChange = this.onInsuranceCompanyCodeChange.bind(this)
        this.onInsurancePolicyNumberChange = this.onInsurancePolicyNumberChange.bind(this)
        this.onInsurancePolicyExpiredChange = this.onInsurancePolicyExpiredChange.bind(this)
        this.onInsurancePolicyExpiredChange = this.onInsurancePolicyExpiredChange.bind(this)
    }

    componentWillMount(){
        // предустановка значений из пациента todo 123: предустановки произвести в хранилище
        this.props.putInsuranceData({
            insuranceCompanyCode: this.props.patient.insuranceCompanyCode || this.props.insuranceForm.insuranceCompanyCode,
            insurancePolicyExpired: this.props.patient.insurancePolicyExpired || this.props.insuranceForm.insurancePolicyExpired,
            insurancePolicyNumber: this.props.patient.insurancePolicyNumber || this.props.insuranceForm.insurancePolicyNumber,
            insurancePolicyType: this.props.patient.insurancePolicyType || this.props.insuranceForm.insurancePolicyType
        })

        this.props.loadData()
            .then(()=>{this.setState({loaded: true})})
    }

    onInsurancePolicyTypeChange(event){
        var value = '';
        if (event){
            value = typeof event.target === "undefined" ? event.value : event.target.value
        }
        this.props.putInsuranceData({ insurancePolicyType: value })
    }

    onRegionChange(event){
        var value = '';
        if (event){
            value = typeof event.target === "undefined" ? event.value : event.target.value
        }
        this.props.putInsuranceData({ regionSMO: value })
    }

    onInsuranceCompanyCodeChange(event){
        var value = '';
        if (event){
            value = typeof event.target === "undefined" ? event.value : event.target.value
        }
        this.props.putInsuranceData({ insuranceCompanyCode: value })
    }

    onInsurancePolicyNumberChange(event){
        this.props.putInsuranceData({ insurancePolicyNumber: event.target.value })
    }

    onInsurancePolicyExpiredChange(event){
        this.props.putInsuranceData({ insurancePolicyExpired: event.target.value })
    }

    render(){
        var trans = this.props.trans;
        var transCodes = this.props.transCodes;

        var optionsInsuranceType;
        var optionsRegions;
        var optionsCompanies;
        var valueRegion = this.props.insuranceForm.regionSMO;
        var valueCompany = this.props.insuranceForm.insuranceCompanyCode;
        var insuranceCompanies = this.props.insuranceCompanies;

        if (this.state.loaded){
            optionsInsuranceType = Object.keys(InsuranceTypeLangRu).map((item)=>({id: item, name: InsuranceTypeLangRu[item]}))
            optionsRegions= this.props.regions.map((item)=>({id: item.code, name: item.name}))

            // если код компании предустановлен при этом код региона предустановленным быть не может
            if (this.props.insuranceForm.insuranceCompanyCode && !valueRegion){

                // найти запись о компании
                let company = insuranceCompanies.find((company)=>{
                    return company.code === valueCompany
                });

                if (!company){
                    throw new Error('Company for this User are not found')
                }

                // найти соответствующую запись о регионе
                let region = this.props.regions.find((item)=>{
                    return item.code === company.regionCode
                });

                // найти записи всех компаний для региона
                let companies = insuranceCompanies.filter((item)=>{
                    return item.regionCode === company.regionCode
                });

                valueRegion = region.code;
                optionsCompanies = companies.map((item)=>({id: item.code, name: item.name}))

            } else if (valueRegion){
                let companies = insuranceCompanies.filter((item)=>{
                    return valueRegion === item.regionCode
                });
                optionsCompanies = companies.map((item)=>({id: item.code, name: item.name}))
            }
        }

        return !this.state.loaded ? <PreloaderView /> : (
            <div className="form_container_section">
                <div className="step_block_cell width_step270">
                    <div className="input_placeholder">
                        <CustomSelect
                            title={transCodes[this.props.patientErrors.insurancePolicyType] || "Тип полиса"}
                            onChange={this.onInsurancePolicyTypeChange}
                            value={this.props.insuranceForm.insurancePolicyType}
                            ref="insurancePolicyType"
                            className="text_input_style"
                            items={optionsInsuranceType}
                        >
                            {/*InsuranceType.map((item)=><option key={item} value={item}>{item}</option>)*/}
                        </CustomSelect>
                    </div>
                </div>
                <div className="step_block_cell width_step270">
                    <div className="input_placeholder">
                        <CustomSelect
                            title={transCodes[this.props.patientErrors.regionSMO] || "Регион СМО"}
                            onChange={this.onRegionChange}
                            value={valueRegion}
                            ref="regionSMO"
                            className="text_input_style"
                            items={optionsRegions}
                        >
                            {/*this.props.regions.map((item)=><option key={item.id} value={item.code}>{item.name}</option>)*/}
                        </CustomSelect>
                    </div>
                </div>
                <div className="step_block_cell width_step220">
                    <div className="input_placeholder">
                        <CustomSelect
                            title={transCodes[this.props.patientErrors.insuranceCompanyCode] || "Название СМО"}
                            onChange={this.onInsuranceCompanyCodeChange}
                            value={valueCompany}
                            ref="insuranceCompanyCode"
                            className="text_input_style"
                            items={optionsCompanies}
                        >
                            {/*this.props.insuranceCompanies.filter((item)=>{return this.props.insuranceForm.regionSMO===item.regionCode})
                             .map((item)=>{return <option key={item.id} value={item.code}>{item.name}</option>})
                             */}
                        </CustomSelect>
                    </div>
                </div>
                <div className="step_block_cell width_step270">
                    <div className="input_placeholder">
                        <CustomInput
                            ref="insurancePolicyNumber"
                            labelText={"Номер полиса"}
                            errorText={transCodes[this.props.patientErrors.insurancePolicyNumber]}
                        >
                            <RawMaskedInput
                                mask={this.props.insuranceForm.insurancePolicyType === INSURANCE_TEMPORARY_TYPE ? '111111111' : '1111 1111 1111 1111'}
                                placeholder={this.props.insuranceForm.insurancePolicyType === INSURANCE_TEMPORARY_TYPE ? '000000000' : '0000 0000 0000 0000'}
                                placeholderChar=" "
                                onChange={this.onInsurancePolicyNumberChange}
                                value={this.props.insuranceForm.insurancePolicyNumber}
                                type="text"
                                className="text_input_style"
                            />
                        </CustomInput>
                    </div>
                </div>
                {
                    this.props.insuranceForm.insurancePolicyType === INSURANCE_TEMPORARY_TYPE && (
                        <div className="step_block_cell width_step270">
                            <div className="input_placeholder">
                                <CustomInput
                                    ref="insurancePolicyExpired"
                                    labelText={"Дата окончания полиса"}
                                    errorText={transCodes[this.props.patientErrors.insurancePolicyExpired]}
                                >
                                    <DateInput
                                        onChange={this.onInsurancePolicyExpiredChange}
                                        value={this.props.insuranceForm.insurancePolicyExpired}
                                        type="text"
                                        className="text_input_style"
                                    />
                                </CustomInput>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

InsuranceForm.propTypes = {}

InsuranceForm.defaultProps = {}

export default translate("InsuranceForm")(connect(
    state => {
        return {
            patient: state.user.patient,
            insuranceForm: state.user.insuranceForm,
            patientErrors: state.user.patientErrors,
            regions: state.user.regions,
            insuranceCompanies: state.user.insuranceCompanies
        }
    },
    dispatch => ({
        putInsuranceData: data => dispatch(actions.putInsuranceData(data)),
        loadData: () =>
            Promise.all([
                dispatch(actions.fetchRegions()),
                dispatch(actions.fetchInsuranceCompanies())
            ])
    })
)(InsuranceForm));