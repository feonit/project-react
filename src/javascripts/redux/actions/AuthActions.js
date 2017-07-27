import LoginData from '../../models/LoginData'
import RegisterData from '../../models/RegisterData'
import { http } from '../../app'
import AuthorizationData from '../../models/AuthorizationData'
import LoginErrorData from '../../models/LoginErrorData'
import RegisterErrorData from '../../models/RegisterErrorData'
import RegisterResponseData from '../../models/RegisterResponseData'
import ConfirmErrorData from '../../models/ConfirmErrorData'
import RehashResponseData from '../../models/RehashResponseData'
import RehashResponseErrors from '../../models/RehashResponseErrors'
import ConfirmData from '../../models/ConfirmData'
import RecoveryData from '../../models/RecoveryData'
import RecoveryResponseData from '../../models/RecoveryResponseData'
import PatientErrors from '../../models/PatientErrors'

export const UNAUTHORIZED_STATUS = 'UNAUTHORIZED_STATUS';

export const unauthorizedStatus = () => ({
    type: UNAUTHORIZED_STATUS
})

export const REQUEST_LOGIN = "REQUEST_LOGIN"
export const RESPONSE_LOGIN_SUCCESS = "RESPONSE_LOGIN_SUCCESS"
export const RESPONSE_LOGIN_FAILURE = "RESPONSE_LOGIN_FAILURE"
export const UPDATE_LOGIN_FORM_DATA = "UPDATE_LOGIN_FORM_DATA"
export const RESET_LOGIN_ERRORS_DATA = "RESET_LOGIN_ERRORS_DATA"

export const requestLogin = (data) => ({
    type: REQUEST_LOGIN,
    data: data,
    loginIsLoading: true
})

export const receiveLoginData = (data) => ({
    data: data,
    type: RESPONSE_LOGIN_SUCCESS,
    loginIsLoading: false
})

export const invalidData = (errors) => ({
    type: RESPONSE_LOGIN_FAILURE,
    errors: errors,
    loginIsLoading: false
})

export const putLoginForm = (data) => ({
    type: UPDATE_LOGIN_FORM_DATA,
    data: data
})

export const resetLoginErrors = () => ({
    type: RESET_LOGIN_ERRORS_DATA
})

export const fetchLogin = (data) => {
    return dispatch => {
        let url = '/login';
        let loginData = new LoginData(data)
        dispatch(requestLogin(loginData));
        return http.fetchThrowInvalidErrors(url, 'POST', loginData)
            .then( data => {
                data = new AuthorizationData(data)
                return data;
            }, errors => {
                errors = new LoginErrorData(errors)
                throw errors;
            })
    }
}

export const REQUEST_LOGOUT = "REQUEST_LOGOUT"
export const RESPONSE_LOGOUT_SUCCESS = "RESPONSE_LOGOUT_SUCCESS"

export const requestLogout = () => ({
    type: REQUEST_LOGOUT
})

export const receiveLogout = (data) => ({
    data: data,
    type: RESPONSE_LOGOUT_SUCCESS
})

export const fetchLogout = () => {
    return dispatch => {
        let url = '/logout';
        dispatch(requestLogout())
        return http.fetchThrowInvalidErrors(url, 'POST')
            .then( data => {
                dispatch(receiveLogout(data));
                return data;
            }, errors => {
                throw errors;
            })
    }
}

export const REQUEST_REGISTRATION = "REQUEST_REGISTRATION"
export const RESPONSE_REGISTRATION_SUCCESS = "RESPONSE_REGISTRATION_SUCCESS"
export const RESPONSE_REGISTRATION_FAILURE = "RESPONSE_REGISTRATION_FAILURE"
export const UPDATE_REGISTRATION_FORM_DATA = "UPDATE_REGISTRATION_FORM_DATA"

export const putRegisterData = (data) => ({
    type: UPDATE_REGISTRATION_FORM_DATA,
    data: data
})

export const requestRegister = (data) => ({
    data: data,
    type: REQUEST_REGISTRATION,
    registerIsLoading: true
})

export const receiveRegisterSuccess = (data) => ({
    type: RESPONSE_REGISTRATION_SUCCESS,
    data: data,
    registerIsLoading: false
})

export const receiveRegisterFailure = errors => ({
    type: RESPONSE_REGISTRATION_FAILURE,
    errors,
    registerIsLoading: false
})

export const fetchRegister = (data) => {
    return dispatch => {
        let request = new RegisterData(data);
        let url = '/register';
        dispatch(requestRegister(request))
        return http.fetchThrowInvalidErrors(url, 'POST', request)
            .then( data => {
                data = new RegisterResponseData(data)
                return data;
            }, errors => {
                errors = new RegisterErrorData(errors)
                throw errors;
            })
    }
}

export const REQUEST_CONFIRMATION = "REQUEST_CONFIRMATION"
export const RESPONSE_CONFIRMATION_SUCCESS = "RESPONSE_CONFIRMATION_SUCCESS"
export const RESPONSE_CONFIRMATION_FAILURE = "RESPONSE_CONFIRMATION_FAILURE"
export const UPDATE_CONFIRMATION_FORM_DATA = "UPDATE_CONFIRMATION_FORM_DATA"

export const requestConfirm = data => ({
    type: REQUEST_CONFIRMATION,
    confirmIsLoading: true,
    data
})

export const receiveConfirm = data => ({
    type: RESPONSE_CONFIRMATION_SUCCESS,
    confirmIsLoading: false,
    data
})

export const failureConfirm = error => ({
    type: RESPONSE_CONFIRMATION_FAILURE,
    confirmIsLoading: false,
    error
})

export const putConfirmFormData = data => ({
    type: UPDATE_CONFIRMATION_FORM_DATA,
    data
})

export const fetchConfirm = (data) => {
    return dispatch => {
        let request = new ConfirmData(data);
        let url = `/activate/${request.linkId}`;
        dispatch(requestConfirm(request))
        return http.fetchThrowInvalidErrors(url, 'POST', request)
            .then( data => {
                data = new AuthorizationData(data)
                return data;
            }, errors => {
                errors = new ConfirmErrorData(errors)
                throw errors
            })
    }
}

export const RESPONSE_REHASH_SUCCESS = "RESPONSE_REHASH_SUCCESS"
export const RESPONSE_REHASH_FAILURE = "RESPONSE_REHASH_FAILURE"

export const receiveRehash = data => ({
    type: RESPONSE_REHASH_SUCCESS,
    data
})

export const failureRehash = error => ({
    type: RESPONSE_REHASH_FAILURE,
    error
})

export const fetchRehash = (linkId) => {
    return dispatch => {
        let url = `/activate/${linkId}/rehash`;
        return http.fetchThrowInvalidErrors(url, 'POST', {})
            .then( data => {
                data = new RehashResponseData(data)
                return data;
            }, errors => {
                errors = new RehashResponseErrors(errors)
                throw errors
            })
    }
}

export const REQUEST_RECOVERY = "REQUEST_RECOVERY"
export const RESPONSE_RECOVERY_SUCCESS = "RESPONSE_RECOVERY_SUCCESS"
export const RESPONSE_RECOVERY_FAILURE = "RESPONSE_RECOVERY_FAILURE"
export const UPDATE_RECOVERY_FORM_DATA = "UPDATE_RECOVERY_FORM_DATA"

export const requestRecovery = () => ({
    type: REQUEST_RECOVERY,
    recoveryIsLoading: true
})

export const receiveRecovery = () => ({
    type: RESPONSE_RECOVERY_SUCCESS,
    recoveryIsLoading: false
})

export const failureRecovery = error => ({
    type: RESPONSE_RECOVERY_FAILURE,
    recoveryIsLoading: false,
    error
})

export const putRecoveryFormData = data => ({
    type: UPDATE_RECOVERY_FORM_DATA,
    data
})

export const fetchRecovery = (data) => {
    return dispatch => {
        let request = new RecoveryData(data)
        let url = '/recovery';
        dispatch(requestRecovery())
        return http.fetchThrowInvalidErrors(url, 'POST', request)
            .then( data => {
                data = new RecoveryResponseData(data)
                return data;
            }, errors => {
                errors = new PatientErrors(errors)
                throw errors
            })
    }
}