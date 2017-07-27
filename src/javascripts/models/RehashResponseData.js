import PropTypes from 'prop-types'

export default class RehashResponseData{

    constructor(data){
        PropTypes.validateWithErrors({
            code: PropTypes.string.isRequired
        }, data, this.constructor.name);

        this.link = data.link;
    }
}