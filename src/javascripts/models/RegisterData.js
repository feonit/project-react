export default class RegisterData{
    constructor({ surname = "", givenName = "", patronymic = "", mobilePhone = "", email = "", snils = "", recaptcha = "" } = data){
        this.surname = surname;
        this.givenName = givenName;
        this.patronymic = patronymic;
        this.mobilePhone = mobilePhone;
        this.email = email;
        this.snils = snils;
        this.recaptcha = recaptcha;
    }
}