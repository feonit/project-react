import PropTypes from 'prop-types'

export default function InsuranceCompany(id, code, name, regionCode){
    this.id = id;
    this.code = code;
    this.name = name;
    this.regionCode = regionCode;

    PropTypes.validateWithErrors({
        "id": PropTypes.number.isRequired,
        "code": PropTypes.string.isRequired,
        "name": PropTypes.string.isRequired,
        "regionCode": PropTypes.string.isRequired
    }, {
        "id": id,
        "code": code,
        "name": name,
        "regionCode": regionCode
    }, this.constructor.name);
}