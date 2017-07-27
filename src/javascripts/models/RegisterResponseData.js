import PropTypes from 'prop-types'

export default class RegisterResponseData{
    constructor(data){
        PropTypes.validateWithErrors({
            link: PropTypes.string
        }, data, this.constructor.name);
        this.link = data.link;
    }
}