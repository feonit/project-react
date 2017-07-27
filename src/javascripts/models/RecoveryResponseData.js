import PropTypes from 'prop-types'

export default class RecoveryResponseData{
    constructor(data){
        PropTypes.validateWithErrors({
            link: PropTypes.string.isRequired
        }, data, this.constructor.name);

        this.link = data.link;
    }
}