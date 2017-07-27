import AuthorizationData from './AuthorizationData'
import LoginData from './LoginData'
import RegisterData from './RegisterData'
import ConfirmData from './ConfirmData'
import RecoveryData from './RecoveryData'
import LoginErrorData from './LoginErrorData'
import RegisterErrorData from './RegisterErrorData'
import ConfirmErrorData from './ConfirmErrorData'
import RecoveryErrorData from './RecoveryErrorData'

export default class AuthDataArea{
    constructor({ authorizationData = {}, registerData = {}, loginData = {}, confirmData = {}, recoveryData = {}, 
        registerErrors = {}, loginErrors = {}, recoveryErrors = {}, confirmErrors = {}, 
        loginIsLoading = false, registerIsLoading = false, recoveryIsLoading = false, confirmIsLoading = false } = data){
        this.authorizationData = new AuthorizationData(authorizationData)
        this.registerData = new RegisterData(registerData)
        this.registerErrors = new RegisterErrorData(registerErrors)
        this.loginData = new LoginData(loginData)
        this.loginErrors = new LoginErrorData(loginErrors)
        this.loginIsLoading = loginIsLoading;
        this.registerIsLoading = registerIsLoading;
        this.recoveryIsLoading = recoveryIsLoading;
        this.confirmIsLoading = confirmIsLoading;
        this.recoveryData = new RecoveryData(recoveryData)
        this.recoveryErrors = new RecoveryErrorData(recoveryErrors)
        this.confirmData = new ConfirmData(confirmData)
        this.confirmErrors = new ConfirmErrorData(confirmErrors)
    }
}