import ValidationResult from './ValidationResult'

class ValidationAbstract {
    constructor(){
        if ( typeof this.validate !== "function" ){
            throw Error("method 'validate' must be realised")
        }
        this.validate = function validate() {
            let result = this.__proto__.validate.apply(this, arguments)
            if (!result instanceof ValidationResult){
                throw Error("method must return type of ValidationResult")
            }
            return result;
        }
    }

    static equals (valueOne, valueTwo){
        return valueOne === valueTwo
    }

    static isEmpty (value){
        return !value;
    }

    static lengthOfStringIs (str, length){
        return str.length === length
    }
}

export default ValidationAbstract