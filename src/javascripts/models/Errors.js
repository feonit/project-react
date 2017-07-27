class Errors{
    constructor(){

    }
}
    
Errors.prototype.hasErrors = function(){
    return Object.keys(this).some( errorFieldName => {
        return this[errorFieldName] !== "";
    })
};

export default Errors