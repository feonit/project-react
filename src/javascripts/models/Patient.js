import PropTypes from 'prop-types'

export default function Patient(data = {}){

    let {
        clinicId = "", 
        additionalPhone = "", 
        attachmentDate = "", 
        attachmentState = "",
        email = "",
        id =  "",
        language =  "",
        medicId =  "",
        mobilePhone =  "",
        notification =  "",
        snils =  "",
        birthDate =  "",
        documentNumber =  "",
        documentType =  "",
        givenName =  "",
        documentSerial =  "",
        patronymic =  "",
        sex =  "",
        surname =  "",
        insuranceCompanyCode =  "",
        insurancePolicyExpired =  "",
        insurancePolicyNumber =  "",
        insurancePolicyType =  ""
    } = data;

    this.additionalPhone = additionalPhone;
    this.attachmentDate = attachmentDate;
    this.attachmentState = attachmentState;
    this.clinicId = clinicId;
    this.email = email;
    this.id = id;
    this.language = language;
    this.medicId = medicId;
    this.mobilePhone = mobilePhone;
    this.notification = notification;
    this.snils = snils;
    this.birthDate = birthDate;
    this.documentNumber = documentNumber;
    this.documentType = documentType;
    this.givenName = givenName;
    this.documentSerial = documentSerial;
    this.patronymic = patronymic;
    this.sex = sex;
    this.surname = surname;
    this.insuranceCompanyCode = insuranceCompanyCode;
    this.insurancePolicyExpired = insurancePolicyExpired;
    this.insurancePolicyNumber = insurancePolicyNumber;
    this.insurancePolicyType = insurancePolicyType;
}

function getSchema (PropTypes){
    return Object.assign({}, {
        "additionalPhone":          (PropTypes && PropTypes.string.isRequired) || "", //84952234153
        "attachmentDate":           (PropTypes && PropTypes.string.isRequired) || "2016-06-04",
        "attachmentState":          (PropTypes && PropTypes.string.isRequired) || "", //ATTACHED
        "clinicId":                 (PropTypes && PropTypes.number.isRequired) || null, //1
        "email":                    (PropTypes && PropTypes.string.isRequired) || "", //mail@sovet.ru
        "id":                       (PropTypes && PropTypes.number.isRequired) || null, //1
        "language":                 (PropTypes && PropTypes.string.isRequired) || "", //RU
        "medicId":                  (PropTypes && PropTypes.number.isRequired) || null, //3                // или null
        "mobilePhone":              (PropTypes && PropTypes.string.isRequired) || "", //1234567890
        "notification":             (PropTypes && PropTypes.string.isRequired) || "", //ALL
        "snils":                    (PropTypes && PropTypes.string.isRequired) || "", //27686812132
    }, getPassportSchema(PropTypes))
}

let getPassportSchema = function (PropTypes){
    return {
        "birthDate":                (PropTypes && PropTypes.string.isRequired) || "", //2009-08-06
        "documentNumber":           (PropTypes && PropTypes.string.isRequired) || "", //880362
        "documentType":             (PropTypes && PropTypes.string.isRequired) || "", //PASSPORT
        "givenName":                (PropTypes && PropTypes.string.isRequired) || "", //Петр
        "documentSerial":           (PropTypes && PropTypes.string.isRequired) || "", //4511
        "patronymic":               (PropTypes && PropTypes.string.isRequired) || "", //Леонидович
        "sex":                      (PropTypes && PropTypes.string.isRequired) || "", //MALE
        "surname":                  (PropTypes && PropTypes.string.isRequired) || "" //Иванов
    }
};

let getInsuranceSchema = function(PropTypes){
    return {
        "regionCode":               (PropTypes && PropTypes.string.isRequired) || "", //16051
        "insuranceCompanyCode":     (PropTypes && PropTypes.string.isRequired) || "", //16051
        "insurancePolicyExpired":   (PropTypes && PropTypes.string.isRequired) || "", //2009-08-06
        "insurancePolicyNumber":    (PropTypes && PropTypes.string.isRequired) || "", //7700009072550589
        "insurancePolicyType":      (PropTypes && PropTypes.string.isRequired) || "", //FIXED
    }
}

let getContactsSchema = function(PropTypes){
    return {
        "mobilePhone":                  (PropTypes && PropTypes.string.isRequired) || "",
        "additionalPhone":              (PropTypes && PropTypes.string.isRequired) || "",
        "email":                        (PropTypes && PropTypes.string.isRequired) || ""
    }
}

export const PatientSchema = getSchema(PropTypes);
export const PatientDefault = getSchema();

export const PassportSchema = getPassportSchema(PropTypes);
export const PassportDefault = getPassportSchema();

export const InsuranceSchema = getInsuranceSchema(PropTypes);
export const InsuranceDefault  = getInsuranceSchema();

export const ContactsDefault  = getContactsSchema();
export const ContactsSchema  = getContactsSchema(PropTypes);

export const ATTACHED_TYPE = 'ATTACHED'
export const AttachmentState = ['QUEUE', 'PROCESSING', ATTACHED_TYPE, null];
export const PASSPORT_DOCUMENT_TYPE = 'PASSPORT';
export const OTHER_DOCUMENT_TYPE = 'OTHER';
export const DocumentType = [PASSPORT_DOCUMENT_TYPE, OTHER_DOCUMENT_TYPE];

export const LanguageRu = 'RU';
export const LanguageEn = 'EN';
export const LanguageEnum = [LanguageRu, LanguageEn];
export const LanguageDefault = LanguageRu;
export const LanguageEnumLangRu = {
    'RU': 'Русский',
    'EN': 'Английский'
}
export const NotificationEnum = ['NONE', 'ALL', 'MOBILE', 'EMAIL'];
export const NotificationEnumLangRu = {
    'NONE': 'Нет', 
    'ALL': 'Все', 
    'MOBILE': 'По телефону', 
    'EMAIL': 'По почте'
}


let ITypeLangRu = {};
export const INSURANCE_FIXED_TYPE = 'FIXED';
export const INSURANCE_TEMPORARY_TYPE = 'TEMPORARY';
export const InsuranceTypes = [INSURANCE_TEMPORARY_TYPE, INSURANCE_FIXED_TYPE];
ITypeLangRu[INSURANCE_FIXED_TYPE] = 'Постоянный';
ITypeLangRu[INSURANCE_TEMPORARY_TYPE] = 'Временный';

export const InsuranceTypeLangRu = ITypeLangRu;

export const DOCUMENT_SERIAL_LENGTH = 4;
export const DOCUMENT_NUMBER_LENGTH = 6;
export const INSURANCE_FIXED_NUMBER_LENGTH = 16;
export const INSURANCE_TEMPORARY_NUMBER_LENGTH = 9;

export let SexEnumLangRu = {
    'MALE': 'Мужчина',
    'FEMALE': 'Женщина',
}

export let PassportTypesEnumLangRu = {
    [PASSPORT_DOCUMENT_TYPE]: 'Паспорт',
    'OTHER': 'Другое'
}