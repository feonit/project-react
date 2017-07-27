import ValidationAbstract from './ValidationAbstract'
import ValidationResult from './ValidationResult'
import PatientErrors from './PatientErrors'
import { PASSPORT_DOCUMENT_TYPE, DOCUMENT_NUMBER_LENGTH, DOCUMENT_SERIAL_LENGTH } from './Patient'
import { REQUIRED, LENGTH_RULE } from './ClientValidationCodeErrors'

export default class ValidationPassportForm extends ValidationAbstract{
    validate(data){
        let errors = new PatientErrors();
        const { birthDate, documentNumber, documentType, givenName, sex, surname, documentSerial } = data;

        if ( ValidationAbstract.isEmpty(surname) ){
            errors.surname = REQUIRED;
        }

        if ( ValidationAbstract.isEmpty(givenName) ){
            errors.givenName = REQUIRED;
        }

        if ( ValidationAbstract.isEmpty(sex) ){
            errors.sex = REQUIRED;
        }

        if ( ValidationAbstract.isEmpty(birthDate) ){
            errors.birthDate = REQUIRED;
        }

        if ( ValidationAbstract.isEmpty(documentType) ){
            errors.documentType = REQUIRED;
        }

        if ( documentType === PASSPORT_DOCUMENT_TYPE){
            if ( ValidationAbstract.isEmpty(documentSerial) ){
                errors.documentSerial = REQUIRED;
            }
            
            if ( !ValidationAbstract.lengthOfStringIs(documentSerial, DOCUMENT_SERIAL_LENGTH) ){
                errors.documentSerial = LENGTH_RULE;
            }
        }

        if ( ValidationAbstract.isEmpty(documentNumber) ){
            errors.documentNumber = REQUIRED;
        }
        
        if ( !ValidationAbstract.lengthOfStringIs(documentNumber, DOCUMENT_NUMBER_LENGTH) ){
            errors.documentNumber = LENGTH_RULE;
        }

        return new ValidationResult(!errors.hasErrors(), errors)
    }
}