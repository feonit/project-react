import ActionTypes from '../constants/ActionTypes'
import { http } from '../../app'
import apiPath from '../../apiPath'
import Patient from '../../models/Patient'
import PatientErrors from '../../models/PatientErrors'
import PasswordErrors from '../../models/PasswordErrors'
import PasswordSuccess from '../../models/PasswordSuccess'
import InsuranceCompany from '../../models/InsuranceCompany'
import { addTypicalMessage } from '../../redux/actions/BoxMessagesActions'
import Reception from '../../models/Reception'

export function setLanguage(lang){
    return {
        type: ActionTypes.UPDATE_LANGUAGE_SETTINGS,
        lang: lang
    };
}
export function putAttachmentFormData(data){
    return {
        type: ActionTypes.PUT_ATTACHMENT_FORM_DATA,
        data: data
    }
}
export function putInsuranceData(data){
    return {
        type: ActionTypes.PUT_INSURANCE_DATA,
        data: data
    }
}
export function putPassportData(data){
    return {
        type: ActionTypes.PUT_PASSPORT_DATA,
        data: data
    }
}
export function putContactsData(data){
    return {
        type: ActionTypes.PUT_CONTACTS_DATA,
        data: data
    }
}
export function putSettingsData(data){
    return {
        type: ActionTypes.PUT_SETTINGS_DATA,
        data: data
    }
}
export function putPasswordData(data){
    return {
        type: ActionTypes.PUT_PASSWORD_DATA,
        data: data
    }
}
export function addInsuranceData(data){
    return {
        type: ActionTypes.ADD_INSURANCE_DATA_TO_ATTACHMENT_FORM,
        data: data
    }
}
export function addPassportData(data){
    return {
        type: ActionTypes.ADD_PASSPORT_DATA_TO_ATTACHMENT_FORM,
        data: data
    }
}
export function addContactsData(data){
    return {
        type: ActionTypes.ADD_CONTACTS_DATA_TO_ATTACHMENT_FORM,
        data: data
    }
}
export function attachmentChosenClinicId(id){
    return {
        type: ActionTypes.ATTACHMENT_CHOSEN_CLINIC_ID,
        clinicId: id
    }
}
export function meetingChoosenMedicId(id){
    return {
        type: ActionTypes.MEETING_CHOSEN_MEDIC_ID,
        medicId: id
    }
}

export function receivePatientData(patient){
    return {
        type: ActionTypes.RECEIVE_PATIENT_DATA,
        patient: patient
    }
};

function responsePatientUpdateSuccess(data){
    return {
        type: ActionTypes.RESPONSE_PATIENT_SUCCESS,
        data: data
    }
}
function responsePatientUpdateErrors(errors){
    return {
        type: ActionTypes.RESPONSE_PATIENT_ERRORS,
        errors: errors
    }
}


function responsePasswordUpdateSuccess(data){
    return {
        type: ActionTypes.RESPONSE_PASSWORD_SUCCESS,
        data: data
    }
}
function responsePasswordUpdateErrors(errors){
    return {
        type: ActionTypes.RESPONSE_PASSWORD_ERRORS,
        errors: errors
    }
}

export function requestPasswordForm(data){
    return {
        type: ActionTypes.REQUEST_PASSWORD_FORM,
        data: data
    }
}
export function requestMedic(id){
    return {
        type: ActionTypes.REQUEST_MEDIC,
        id: id
    }
}
export function receiveMedic(data, id){
    return {
        type: ActionTypes.RESPONSE_MEDIC_SUCCESS,
        id: id,
        medic: data
    }
}
export function failureMedic(err, id){
    return {
        type: ActionTypes.RESPONSE_MEDIC_FAILURE,
        error: err
    }
}
export function requestClinic(id){
    return {
        type: ActionTypes.REQUEST_CLINIC,
        id: id
    }
}
export function receiveClinic(data, id){
    return {
        type: ActionTypes.RESPONSE_CLINIC_SUCCESS,
        id: id,
        clinic: data
    }
}
export function failureClinic(err, id){
    return {
        type: ActionTypes.RESPONSE_CLINIC_FAILURE,
        error: err
    }
}
export function requestSpecialities(){
    return {
        type: ActionTypes.REQUEST_SPECIALITIES
    }
}
export function receiveSpecialities(data){
    return {
        type: ActionTypes.RESPONSE_SPECIALITIES_SUCCESS,
        specialities :data
    }
}
export function failureSpecialities(err){
    return {
        type: ActionTypes.RESPONSE_SPECIALITIES_FAILURE,
        errors: err
    }
}
export function requestClinics(data){
    return {
        type: ActionTypes.REQUEST_ALL_CLINICS
    }
}
export function receiveClinics(data){
    // todo работа с везде клиниками осуществлялась по хешу, нужно будет переделать на массив
    var map = {};
    data.forEach((item)=>{
        map[item.id] = item;
    });

    return {
        type: ActionTypes.RESPONSE_ALL_CLINICS_SUCCESS,
        clinics: map
    }
}
export function failureClinics(err){
    return {
        type: ActionTypes.RESPONSE_ALL_CLINICS_FAILURE,
        errors: err
    }
}
export function requestMedicsOfClinic(id){
    return {
        type: ActionTypes.REQUEST_MEDICS_OF_CLINIC,
        clinicId: id
    }
}
export function receiveMedicsOfClinic(id, data){
    return {
        type: ActionTypes.RESPONSE_MEDICS_OF_CLINIC_SUCCESS,
        medics: data,
        clinicId: id
    }
}
export function failureMedicsOfClinic(err){
    return {
        type: ActionTypes.RESPONSE_MEDICS_OF_CLINIC_FAILURE,
        error: err
    } 
}
export function requestAllReceptions(id){
    return {
        type: ActionTypes.REQUEST_ALL_RECEPTIONS,
        patientId: id
    }
}
export function receiveAllReceptions(data){
    return {
        type: ActionTypes.RESPONSE_ALL_RECEPTIONS_SUCCESS,
        receptions: data
    }
}
export function failureAllReceptions(err){
    return {
        type: ActionTypes.RESPONSE_ALL_RECEPTIONS_FAILURE,
        error: err
    }
}
export function requestReception (id, receptionId){
    return {
        type: ActionTypes.REQUEST_RECEPTION,
        patientId: id,
        receptionId: receptionId
    }
}
export function receiveReception (data){
    return {
        type: ActionTypes.RESPONSE_RECEPTION_SUCCESS,
        reception: data
    }
}
export function failureReception (err){
    return {
        type: ActionTypes.RESPONSE_RECEPTION_FAILURE,
        error: err
    }
}
export function requestUpdatePatient(data){
    return {
        type: ActionTypes.REQUEST_UPDATE_PATIENT,
        data: data
    }
}
export function requestRegions(){
    return {
        type: ActionTypes.REQUEST_REGIONS
    }
}
export function responseRegionsSuccess(data){
    return {
        type: ActionTypes.RESPONSE_REGIONS_SUCCESS,
        regions: data
    }
}
export function requestInsuranceCompanies(){
    return {
        type: ActionTypes.REQUEST_INSURANCE_COMPANIES
    }
}
export function responseInsuranceCompaniesSuccess(data){
    return {
        type: ActionTypes.RESPONSE_INSURANCE_COMPANIES_SUCCESS,
        insuranceCompanies: data
    }
}
export function putMedicIdToMeetingForm(id){
    return {
        type: ActionTypes.PUT_MEDIC_ID_TO_MEETING_FORM,
        medicId: id
    }
}
export function changeFeedbackMessage(message){
    return {
        type: ActionTypes.CHANGED_FEEDBACK_MESSAGE,
        message: message
    }
}
export function removeSchedules(){
    return {
        type: ActionTypes.REMOVE_SCHEDULES
    }
}
export function requestSchedule(medicId){
    return {
        type: ActionTypes.REQUEST_SCHEDULE,
        medicId: medicId
    }
}
export function responseSchedule(medicId, data){
    return {
        type: ActionTypes.RESPONSE_SCHEDULE,
        medicId: medicId,
        data: data
    }
}
export function receiveSchedule(data){
    return { type: ActionTypes.RECEIVE_SCHEDULE, schedule: data}
}
export function putReceptionTypeToMeetingForm(type){
    return {
        type: ActionTypes.PUT_MEETING_TYPE_TO_MEETING_FORM,
        receptionType: type
    }
}
export function putReceptionToMeetingForm(id){
    return {
        type: ActionTypes.PUT_RECEPTION_TO_MEETING_FORM,
        receptionId: id
    }
}
export function resetMeetingForm(){
    return {
        type: ActionTypes.RESET_MEETING_FORM
    }
}

export function fetchProfile(id){
    return dispatch => {
        var url = apiPath.patients(id);
        return http.fetchThrowInvalidErrors(url)
            .then( data => {
                data = new Patient(data)
                dispatch(receivePatientData(data));
                return data;
            }, errors => {
                dispatch(addTypicalMessage({ level: 'ERROR', text: `${url} ${errors}`}));
            })
    }
};

export function fetchMedic(id){
    return dispatch => {
        var url = apiPath.medics(id);
        dispatch(requestMedic(id));
        return http.fetchThrowInvalidErrors(url)
            .then( data => {
                dispatch(receiveMedic(data, id))
            }, errors => {
                dispatch(addTypicalMessage({ level: 'ERROR', text: `${url} ${errors}`}));
                dispatch(failureMedic(errors, id))
                throw errors;
            })
    }
};

export function fetchUpdatePatient(patientId, data){
    return dispatch => {
        var url = `/patients/${patientId}`;
        dispatch(requestUpdatePatient(data))
        return http.fetchThrowInvalidErrors(url, 'POST', data)
            .then( data => {
                data = new Patient(data)
                dispatch(responsePatientUpdateSuccess(data));
                return data;
            }, errors => {
                errors = new PatientErrors(errors)
                dispatch(responsePatientUpdateErrors(errors));
                throw errors;
            })
    }
}

export function fetchPutPatient(patientId, data){
    return dispatch => {

        var updateData = {};

        Object.keys(data).forEach(key => {
            if (data.hasOwnProperty(key)){
                if (data[key]){
                    updateData[key] = data[key];
                }
            }
        });

        var url = `/patients/${patientId}`;
        dispatch(requestUpdatePatient(updateData))
        return http.fetchThrowInvalidErrors(url, 'POST', updateData)
            .then( data => {
                data = new Patient(data)
                dispatch(responsePatientUpdateSuccess(data))
                return data;
            }, errors => {
                errors = new PatientErrors(errors)
                dispatch(responsePatientUpdateErrors(errors));
                throw errors;
            })
    }
}

export function fetchClinic(id){
    return dispatch => {
        var url = apiPath.clinics(id);
        dispatch(requestClinic(id));
        return http.fetchThrowInvalidErrors(url)
            .then( data => {
                dispatch(receiveClinic(data, id))
                return data
            }, errors => {
                dispatch(addTypicalMessage({ level: 'ERROR', text: `${url} ${errors}`}));
                dispatch(failureClinic(err, id));
                throw errors
            })
    }
};

export function fetchSpecialities(){
    return dispatch => {
        var url = apiPath.specialities;
        dispatch(requestSpecialities());
        return http.fetchThrowInvalidErrors(url)
            .then( data => {
                dispatch(receiveSpecialities(data.items));
                return data.items
            }, errors => {
                dispatch(addTypicalMessage({ level: 'ERROR', text: `${url} ${errors}`}));
                dispatch(failureSpecialities(errors))
                throw errors
            })
    }
}

export function fetchMedicsOfClinic(clinicId){
    return dispatch => {
        var url = apiPath.medics();
        var query = {
            "filter[clinicId]": clinicId
        };
        dispatch(requestMedicsOfClinic(clinicId))
        return http.fetchThrowInvalidErrors(url, 'GET', null, query)
            .then( data => {
                dispatch(receiveMedicsOfClinic(clinicId, data.items))
                return data;
            }, errors => {
                dispatch(addTypicalMessage({ level: 'ERROR', text: `${url} ${errors}`}));
                dispatch(failureMedicsOfClinic(errors))
                throw errors
            })
    }
}

export function fetchAllClinics(){
    return dispatch => {
        var url = apiPath.clinics();
        dispatch(requestClinics());
        return http.fetchThrowInvalidErrors(url)
            .then( data => {
                dispatch(receiveClinics(data.items))
            }, errors => {
                dispatch(addTypicalMessage({ level: 'ERROR', text: `${url} ${errors}`}));
                dispatch(failureClinics(errors))
            })
    }
}

export function fetchAllReceptions(patientId){
    return dispatch => {
        var url = apiPath.receptions(patientId);
        dispatch(requestAllReceptions(patientId))
        return http.fetchThrowInvalidErrors(url)
            .then( data => {
                data = data.items.map( item => new Reception(item));
                dispatch(receiveAllReceptions(data))
                return data
            }, errors => {
                dispatch(addTypicalMessage({ level: 'ERROR', text: `${url} ${errors}`}));
                dispatch(failureAllReceptions(errors))
                throw errors;
            })
    }
}

export function fetchReception(patientId, receptionId){
    return dispatch => {
        var url = apiPath.receptions(patientId, receptionId);
        dispatch(requestReception(patientId, receptionId))
        return http.fetchThrowInvalidErrors(url)
            .then( data => {
                dispatch(receiveReception(data))
                return data
            }, errors => {
                dispatch(addTypicalMessage({ level: 'ERROR', text: `${url} ${errors}`}));
                dispatch(failureReception(errors))
                throw errors;
            })
    }
}

export function updateReception(patientId, receptionId, data){
    return dispatch => {
        var url = `/patients/${patientId}/receptions/${receptionId}`;
        //dispatch(requestReceptionUpdate(receptionId))
        return http.fetchThrowInvalidErrors(url, 'POST', data)
            .then( data => {
                // dispatch(receiveReceptionUpdate(data))
            })
    }
}

export function fetchRegions(){
    return dispatch => {
        let url = '/thesaurus/regions';
        dispatch(requestRegions());
        return http.fetchThrowInvalidErrors(url)
            .then( data =>{
                dispatch(responseRegionsSuccess(data.items))
            })
    }
}

export function fetchInsuranceCompanies(){
    return dispatch => {
        let url = '/thesaurus/insuranceCompanies';
        dispatch(requestInsuranceCompanies());
        return http.fetchThrowInvalidErrors(url)
            .then( data => {
                var items = data.items.map( item => new InsuranceCompany(item.id, item.code, item.name, item.regionCode))
                dispatch(responseInsuranceCompaniesSuccess(items))
            })
    }
}

export function fetchAttachment(clinicId, patientId){
    return dispatch => {
        let url = `/clinics/${clinicId}/patients/${patientId}`
        var data = {};
        return http.fetchThrowInvalidErrors(url, 'PUT', data)
            .then( data => {
                return data;
            }, errors => {
                dispatch(responsePatientUpdateErrors( errors ))
                throw errors;
            })
    }
}

export function fetchSchedule(medicId, type){
    return dispatch => {
        var url = `/medics/${medicId}/schedule`;
        dispatch(requestSchedule(medicId));
        return http.fetchThrowInvalidErrors(url, 'GET', null, { type: type })
            .then( data => {
                dispatch(responseSchedule(medicId, data));
                return data
            })
    }
}

export function fetchCreateReception(type, medicId, patientId, dateTime){
    return dispatch => {
        var url = `/patients/${patientId}/receptions`;
        return http.fetchThrowInvalidErrors(url, 'PUT', { type: type, dateTime: dateTime, medicId: medicId })
    }
}

export function fetchUpdateReception(receptionId, medicId, patientId, dateTime){
    return dispatch => {
        var url = `/patients/${patientId}/receptions/${receptionId}`;
        return http.fetchThrowInvalidErrors(url, 'POST', { dateTime: dateTime, medicId: medicId })
    }
}

export function submitFeedbackMessage(patientId, message){
    return dispatch => {
        let url = `/patients/${patientId}/feedbacks`;
        return http.fetchThrowInvalidErrors(url, 'PUT', { message: message })
    }
}

import ValidationPasswordForm from '../../models/ValidationPasswordForm'

export function fetchPasswordForm(patientId, data){
    return dispatch => {
        var url = `/patients/${patientId}/password`;
        dispatch(requestPasswordForm(data))

        // --> простенькая клиентская проверка на условие идентичности
        let validate = new ValidationPasswordForm().validate(data);
        // <-- простенькая клиентская проверка

        if ( !validate.isValid ){

            let errors = new PasswordErrors(validate.errors);

            dispatch(responsePasswordUpdateErrors(errors))

            return Promise.reject(errors)
            
        } else {
            return http.fetchThrowInvalidErrors(url, 'POST', data)
                .then( data => {
                    data = new PasswordSuccess(data);
                    dispatch(responsePasswordUpdateSuccess(data));
                    return data;
                }, errors => {
                    errors = new PasswordErrors(errors)
                    dispatch(responsePasswordUpdateErrors(errors))
                    throw errors
                })
        }
    }
}

