import PropTypes from 'prop-types'

// данные
// ошибки валидации
// полный крах
// не авторизован

export let ResponseSchema = {
    "version": PropTypes.number.isRequired,
    "status": PropTypes.oneOf([0,1,2,3]).isRequired,
    "errors": PropTypes.object,
    "data": PropTypes.object
};

class Response{
    constructor(params){
        let { version, status, errors, data, APIErrorMessage } = params;

        PropTypes.validateWithErrors(ResponseSchema, params, this.constructor.name);

        this.version = version;
        this.status = status;
        this.errors = errors;
        this.data = data;
        this.APIErrorMessage = APIErrorMessage;
    }
}

Response.prototype.STATUS_CODE_INVALID = 1;

Response.prototype.isValid = function(){
    return this.status === 0;
};

export default Response;
    
