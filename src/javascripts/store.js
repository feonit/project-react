import { createStore, applyMiddleware } from 'redux'
import reduxLogger from 'redux-logger'
import combinedReducer from './redux/reducers'
import thunkMiddleware from 'redux-thunk'
import {PassportDefault, InsuranceDefault, ContactsDefault} from './models/Patient'
import {LanguageDefault} from './models/Patient'
import PatientErrors from './models/PatientErrors'
import PasswordErrors from './models/PasswordErrors'

import AppSystemSettings from './models/AppSystemSettings'
import BoxMessageList from './models/BoxMessageList'
import { getAuthData, getApiPath } from './localStorageManager'

import AuthDataArea from './models/AuthDataArea'

export default function initStore(){
    var loggerMiddleware = reduxLogger();
    var authorizationData = getAuthData();
    var apiPath = getApiPath();

    var initialState = {
        boxMessages: new BoxMessageList,
        system: new AppSystemSettings({apiPath: apiPath}),
        auth: new AuthDataArea({authorizationData: authorizationData}),
        user: {
            lang: LanguageDefault,
            token: "",
            loadProcessIsBusy: false,

            //data
            patient: null,

            //dictionaries
            specialities: null,
            insuranceCompanies: null,

            //collections of data
            clinics: {},
            medics: {},
            regions: null,
            schedules: [],
            receptions: {},

            // binds of data
            dataModels: {
                clinicToMedicsOneToMany: {

                }
            },

            //ui state
            feedbackMessage: "", // string
            attachmentFormChosenValues: {},
            meetingFormChosenValues: {},
            insuranceForm: InsuranceDefault,
            patientErrors: new PatientErrors,
            passwordErrors: new PasswordErrors,
            passportForm: PassportDefault,
            contactsForm: ContactsDefault,
            settingsForm: {},
            passwordForm: {},
            meetingForm: {},
            routing: {},
            /** конфигурирует кнопку навигации "назад" */
            previousPathname: document.referrer
        }
    };

    var store = createStore(
        combinedReducer,
        initialState,
        applyMiddleware(
            thunkMiddleware, // lets us dispatch() functions
            loggerMiddleware // neat middleware that logs actions
        )
    )

    return store;
}
