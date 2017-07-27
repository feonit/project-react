import ValidationAbstract from './ValidationAbstract'
import ValidationResult from './ValidationResult'
import PasswordErrors from './PasswordErrors'
import { REQUIRED, PASSWORD_RULE } from './ClientValidationCodeErrors'

export default class ValidationPasswordForm extends ValidationAbstract{
    validate(data){
        let errors = new PasswordErrors();
        const { passwordOld, passwordNew, passwordNewRepeat } = data;

        if ( ValidationAbstract.isEmpty(passwordOld) ){
            errors.passwordOld = REQUIRED;
        }

        if ( ValidationAbstract.isEmpty(passwordNew) ){
            errors.passwordNew = REQUIRED;
        }

        if ( ValidationAbstract.isEmpty(passwordNewRepeat) ){
            errors.passwordNewRepeat = REQUIRED;
        }

        if (!errors.hasErrors()){
            if ( !ValidationAbstract.equals(passwordNew, passwordNewRepeat) ){
                errors.passwordNewRepeat = PASSWORD_RULE;
            }
        }

        return new ValidationResult(!errors.hasErrors(), errors)
    }
}