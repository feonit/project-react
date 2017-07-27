"strict mode"

import Errors from './Errors'
export default class LoginErrorData extends Errors{
    constructor(data){
        super()
        let {login = "", password = ""} = data
        this.login = login;
        this.password = password;  
    }
}