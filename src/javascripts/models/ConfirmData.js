export default class ConfirmData{
    constructor({code = "", password = "", passwordRepeat = "", linkId = ""} = data){
        this.linkId = linkId;
        this.code = code;
        this.password = password;
        this.passwordRepeat = passwordRepeat;
    }
}