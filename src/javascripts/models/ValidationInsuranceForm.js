import ValidationAbstract from './ValidationAbstract'
import ValidationResult from './ValidationResult'
import PatientErrors from './PatientErrors'
import { INSURANCE_TEMPORARY_TYPE, INSURANCE_FIXED_TYPE, INSURANCE_FIXED_NUMBER_LENGTH, INSURANCE_TEMPORARY_NUMBER_LENGTH } from './Patient'
import { REQUIRED, LENGTH_RULE } from './ClientValidationCodeErrors'

export default class ValidationInsuranceForm extends ValidationAbstract{
    validate(data){
        let errors = new PatientErrors();
        const { insuranceCompanyCode, insurancePolicyNumber, insurancePolicyType, insurancePolicyExpired } = data;

        if ( ValidationAbstract.isEmpty(insuranceCompanyCode) ){
            errors.insuranceCompanyCode = REQUIRED;
        }

        if ( ValidationAbstract.isEmpty(insurancePolicyNumber) ){
            errors.insurancePolicyNumber = REQUIRED;
        }
        
        if ( ValidationAbstract.isEmpty(insurancePolicyType) ){
            errors.insurancePolicyType = REQUIRED;
        }
        
        if ( ValidationAbstract.equals(insurancePolicyType, INSURANCE_FIXED_TYPE) ){
            if ( !ValidationAbstract.lengthOfStringIs(insurancePolicyNumber, INSURANCE_FIXED_NUMBER_LENGTH) ){
                errors.insurancePolicyNumber = LENGTH_RULE;
            }
        }

        if ( ValidationAbstract.equals(insurancePolicyType, INSURANCE_TEMPORARY_TYPE) ){
            if ( !ValidationAbstract.lengthOfStringIs(insurancePolicyNumber, INSURANCE_TEMPORARY_NUMBER_LENGTH) ){
                errors.insurancePolicyNumber = LENGTH_RULE;
            }
        }

        if ( insurancePolicyType === INSURANCE_TEMPORARY_TYPE){
            if ( ValidationAbstract.isEmpty(insurancePolicyExpired) ){
                errors.insurancePolicyExpired = REQUIRED;
            }
        }

        return new ValidationResult(!errors.hasErrors(), errors)
    }
}