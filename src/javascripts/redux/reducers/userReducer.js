import ActionTypes from '../constants/ActionTypes'

export default function (state, action) {
    state = state || [];

    switch (action.type) {
        case "@@router/LOCATION_CHANGE":
            return {...state, routing: {...state.routing, hash: action.payload.hash, pathname: action.payload.pathname, query: action.payload.query} }

        case ActionTypes.UPDATE_LANGUAGE_SETTINGS:
            return {...state, lang: action.lang }

        case ActionTypes.RECEIVE_PATIENT_DATA:
            return {...state, patient: action.patient }

        case "UPDATE_PREVIOUSPATHNAME":
            return Object.assign({}, state, {previousPathname: action.previousPathname});

        case ActionTypes.RESPONSE_CLINIC_SUCCESS:
            return {...state, clinics: {...state.clinics, [action.id]: action.clinic} }

        case ActionTypes.RESPONSE_MEDIC_SUCCESS:
            state.medics[action.id] = action.medic;
            return {...state, medics: {...state.medics, [action.id]: action.medic} }

        case ActionTypes.RESPONSE_SPECIALITIES_SUCCESS:
            return {...state, specialities: action.specialities }

        case ActionTypes.RESPONSE_ALL_CLINICS_SUCCESS:
            return {...state, clinics: action.clinics, attachmentFormChosenValues: {
                ...state.attachmentFormChosenValues,
                clinicId: action.clinics && action.clinics[Object.keys(action.clinics)[0]].id} // todo перепроектировать клиники
            }

        case ActionTypes.ATTACHMENT_CHOSEN_CLINIC_ID:
            return {...state, attachmentFormChosenValues: {...state.attachmentFormChosenValues, clinicId: action.clinicId} }

        case ActionTypes.MEETING_CHOSEN_MEDIC_ID:
            return {...state, meetingFormChosenValues: {...state.meetingFormChosenValues, chosenMedicId: action.medicId} }


        case ActionTypes.PUT_ATTACHMENT_FORM_DATA:
            return {...state, attachmentFormChosenValues: {...state.attachmentFormChosenValues, ...action.data} }

        case ActionTypes.RESPONSE_MEDICS_OF_CLINIC_SUCCESS:
            let actionMedics = action.medics;
            let storedMedics = state.medics;
            let medicIds = actionMedics.map((i)=>{return i.id});

            // обновляем клиники
            actionMedics.forEach((i)=>{
                storedMedics[i.id] = i;
            });

            // обновляем связи
            state.dataModels.clinicToMedicsOneToMany = Object.assign({}, state.dataModels.clinicToMedicsOneToMany, { [action.clinicId]: medicIds });

            return {...state, medics: storedMedics, dataModels: state.dataModels }

        case ActionTypes.RESPONSE_RECEPTION_SUCCESS:
            return {...state, receptions: {...state.receptions, [action.reception.id]: action.reception }}

        case ActionTypes.RESPONSE_REGIONS_SUCCESS:
            return {...state, regions: action.regions }

        case ActionTypes.RESPONSE_INSURANCE_COMPANIES_SUCCESS:
            return {...state, insuranceCompanies: action.insuranceCompanies }

        case ActionTypes.PUT_INSURANCE_DATA:
            return {...state, insuranceForm: {...state.insuranceForm, ...action.data }}

        case ActionTypes.PUT_PASSPORT_DATA:
            return {...state, passportForm: {...state.passportForm, ...action.data }}

        case ActionTypes.PUT_CONTACTS_DATA:
            return {...state, contactsForm: {...state.contactsForm, ...action.data }}

        case ActionTypes.PUT_SETTINGS_DATA:
            return {...state, settingsForm: {...state.settingsForm, ...action.data }}

        case ActionTypes.PUT_PASSWORD_DATA:
            return {...state, passwordForm: {...state.passwordForm, ...action.data }}

        case ActionTypes.ADD_INSURANCE_DATA_TO_ATTACHMENT_FORM:
            return {...state, attachmentFormChosenValues: {...state.attachmentFormChosenValues, ...state.insuranceForm }}

        case ActionTypes.ADD_PASSPORT_DATA_TO_ATTACHMENT_FORM:
            return {...state, attachmentFormChosenValues: {...state.attachmentFormChosenValues, ...state.passportForm }}

        case ActionTypes.ADD_CONTACTS_DATA_TO_ATTACHMENT_FORM:
            return {...state, attachmentFormChosenValues: {...state.attachmentFormChosenValues, ...state.contactsForm }}

        case ActionTypes.CHANGED_FEEDBACK_MESSAGE:
            return {...state, feedbackMessage: action.message }

        case ActionTypes.RESPONSE_ALL_RECEPTIONS_SUCCESS:
            var hash = {};
            action.receptions.forEach((item)=>{hash[item.id]=item});
            return {...state, receptions: hash }

        case ActionTypes.PUT_MEDIC_ID_TO_MEETING_FORM: 
            return {...state, meetingForm: {...state.meetingForm, medicId: action.medicId } }

        case ActionTypes.PUT_MEETING_TYPE_TO_MEETING_FORM:
            return {...state, meetingForm: {...state.meetingForm, type: action.receptionType } }

        case ActionTypes.RECEIVE_SCHEDULE:
            return {...state, schedules: state.schedules.concat([action.schedule]) }

        case ActionTypes.PUT_RECEPTION_TO_MEETING_FORM:
            return {...state, meetingForm: state.receptions[action.receptionId] || {} }

        case ActionTypes.REMOVE_SCHEDULES:
            return {...state, schedules: [] }

        case ActionTypes.RESET_MEETING_FORM:
            return {...state, meetingForm: {} }

        case ActionTypes.RESPONSE_PATIENT_ERRORS:
            return {...state, patientErrors: action.errors }

        case ActionTypes.RESPONSE_PASSWORD_ERRORS:
            return {...state, passwordErrors: action.errors }

        case ActionTypes.RESPONSE_PATIENT_SUCCESS:
            return {...state, patient: action.data }

        default:
            return state;
    }
};