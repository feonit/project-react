import Errors from './Errors'

export default class PatientErrors extends Errors{

    constructor(props = {}) {
        super(props)
        
        let { regionSMO = "",
            insuranceCompanyCode = "",
            insurancePolicyExpired = "",
            insurancePolicyNumber = "",
            insurancePolicyType = "",
            birthDate = "",
            documentNumber = "",
            documentType = "",
            givenName = "",
            documentSerial = "",
            patronymic = "",
            sex = "",
            surname = "",
            mobilePhone = "",
            snils =  "",
            additionalPhone = "",
            email = ""
        } = props;

        this.regionSMO = regionSMO;
        this.insuranceCompanyCode = insuranceCompanyCode;
        this.insurancePolicyExpired = insurancePolicyExpired;
        this.insurancePolicyNumber = insurancePolicyNumber;
        this.insurancePolicyType = insurancePolicyType;
        this.birthDate = birthDate;
        this.documentNumber = documentNumber;
        this.documentType = documentType;
        this.givenName = givenName;
        this.documentSerial = documentSerial;
        this.patronymic = patronymic;
        this.sex = sex;
        this.snils = snils;
        this.surname = surname;
        this.mobilePhone = mobilePhone;
        this.additionalPhone = additionalPhone;
        this.email = email;
    }
}