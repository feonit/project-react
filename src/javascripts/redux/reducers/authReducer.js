import AuthorizationData from '../../models/AuthorizationData'
import AuthDataArea from '../../models/AuthDataArea'
import LoginErrorData from '../../models/LoginErrorData'
import { setAuthData, removeAuthData } from '../../localStorageManager'
import {
    UNAUTHORIZED_STATUS,
    RESPONSE_LOGIN_SUCCESS,
    UPDATE_LOGIN_FORM_DATA,
    REQUEST_LOGIN,
    RESPONSE_LOGIN_FAILURE,
    RESPONSE_LOGOUT_SUCCESS,
    REQUEST_LOGOUT,
    UPDATE_REGISTRATION_FORM_DATA,
    REQUEST_REGISTRATION,
    RESPONSE_REGISTRATION_SUCCESS,
    RESPONSE_REGISTRATION_FAILURE,
    UPDATE_CONFIRMATION_FORM_DATA,
    REQUEST_CONFIRMATION,
    RESPONSE_CONFIRMATION_SUCCESS,
    RESPONSE_CONFIRMATION_FAILURE,
    RESPONSE_REHASH_SUCCESS,
    RESPONSE_REHASH_FAILURE,
    RESPONSE_RECOVERY_FAILURE,
    REQUEST_RECOVERY,
    RESPONSE_RECOVERY_SUCCESS,
    UPDATE_RECOVERY_FORM_DATA,
    RESET_LOGIN_ERRORS_DATA,
} from '../actions/AuthActions'

export default function (state, action) {
    state = state || [];

    switch (action.type) {
        case REQUEST_LOGIN:
            state = new AuthDataArea({...state, loginIsLoading: action.loginIsLoading }); break;

        case RESPONSE_LOGIN_SUCCESS:
            setAuthData(action.data)
            state = new AuthDataArea({...state, loginIsLoading: action.loginIsLoading, authorizationData: action.data }); break;

        case RESPONSE_LOGIN_FAILURE:
            state = new AuthDataArea({...state, loginIsLoading: action.loginIsLoading, loginErrors: action.errors }); break;

        case UPDATE_LOGIN_FORM_DATA:
            state = new AuthDataArea({...state, loginData: {...state.loginData, ...action.data } }); break;

        case UPDATE_REGISTRATION_FORM_DATA:
            state = new AuthDataArea({...state, registerData: {...state.registerData, ...action.data } }); break;

        case REQUEST_REGISTRATION:
            state = new AuthDataArea({...state, registerIsLoading: action.registerIsLoading }); break;

        case RESPONSE_REGISTRATION_SUCCESS:
            state = new AuthDataArea({...state, registerIsLoading: action.registerIsLoading }); break;

        case RESPONSE_REGISTRATION_FAILURE:
            state = new AuthDataArea({...state, registerIsLoading: action.registerIsLoading, registerErrors: action.errors }); break;

        case RESPONSE_LOGOUT_SUCCESS:
            removeAuthData()
            state = new AuthDataArea({...state, authorizationData: new AuthorizationData() }); break;

        case UNAUTHORIZED_STATUS:
            removeAuthData()
            state = new AuthDataArea({...state, authorizationData: new AuthorizationData() }); break;

        case UPDATE_RECOVERY_FORM_DATA:
            state = new AuthDataArea({...state, recoveryData: {...state.recoveryData, ...action.data} }); break;

        case UPDATE_CONFIRMATION_FORM_DATA:
            state = new AuthDataArea({...state, confirmData: {...state.confirmData, ...action.data} }); break;

        case REQUEST_CONFIRMATION:
            state = new AuthDataArea({...state, confirmIsLoading: action.confirmIsLoading}); break;
        
        case RESPONSE_CONFIRMATION_SUCCESS:
            state = new AuthDataArea({...state, confirmIsLoading: action.confirmIsLoading, confirmData: action.data}); break;
        
        case RESPONSE_CONFIRMATION_FAILURE:
            state = new AuthDataArea({...state, confirmIsLoading: action.confirmIsLoading, confirmErrors: action.error}); break;
        
        case REQUEST_RECOVERY:
            state = new AuthDataArea({...state, recoveryIsLoading: action.recoveryIsLoading}); break;
        
        case RESPONSE_RECOVERY_SUCCESS:
            state = new AuthDataArea({...state, recoveryIsLoading: action.recoveryIsLoading}); break;

        case RESPONSE_RECOVERY_FAILURE:
            state = new AuthDataArea({...state, recoveryIsLoading: action.recoveryIsLoading, recoveryErrors: action.error}); break;

        case RESET_LOGIN_ERRORS_DATA:
            state = new AuthDataArea({...state, loginErrors: new LoginErrorData({})}); break;

        // default:
            // throw Error('auth reducer not found action type')
    }

    return state
};