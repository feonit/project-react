import Errors from './Errors'
export default class RegisterErrorData extends Errors{
    constructor({surname = "", givenName = "", patronymic = "", snils = "", mobilePhone = "", email = "", recaptcha = ""} = data){
        super()
        this.surname = surname;
        this.givenName = givenName;
        this.patronymic = patronymic;
        this.snils = snils;
        this.mobilePhone = mobilePhone;
        this.email = email;
        this.recaptcha = recaptcha;
    }
}