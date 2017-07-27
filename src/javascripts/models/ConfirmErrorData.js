import Errors from './Errors'
export default class ConfirmErrorData extends Errors{
    constructor({ code = "", password = "", passwordRepeat = "" } = data){
        super()
        this.code = code;
        this.password = password;
        this.passwordRepeat = passwordRepeat;
    }
}