import ValidationAbstract from './ValidationAbstract'
import ValidationResult from './ValidationResult'
import LoginErrorData from './LoginErrorData'
import { REQUIRED } from './ClientValidationCodeErrors'

export default class LoginDataValidation extends ValidationAbstract{
    validate({ login, password } = data){
        let errors = new LoginErrorData({});

        if ( ValidationAbstract.isEmpty(login) ){
            errors.login = REQUIRED;
        }

        if ( ValidationAbstract.isEmpty(password) ){
            errors.password = REQUIRED;
        }

        return new ValidationResult(!errors.hasErrors(), errors)
    }
}