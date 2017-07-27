import Errors from './Errors'

export default class PasswordErrors extends Errors{
    constructor(data = {passwordOld: "", passwordNew: "", passwordNewRepeat: ""}){
        super();
        this.passwordOld = data.passwordOld;
        this.passwordNew = data.passwordNew;
        this.passwordNewRepeat = data.passwordNewRepeat;
    }
}