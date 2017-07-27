import Errors from './Errors'
export default class RecoveryErrorData extends Errors{
    constructor({ snils = "", mobilePhone = "", email = "" } = data){
        super()
        this.snils = snils;
        this.mobilePhone = mobilePhone;
        this.email = email;
    }
}