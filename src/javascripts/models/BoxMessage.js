import PropTypes from 'prop-types'
export const WARN = 'WARN'
export const ERROR = 'ERROR'

var currentId = 0;

export default class BoxMessage {
    constructor(level = ERROR, text = 'Неизвестная ошибка'){
        this.level = level;
        this.text = text;
        this.id = currentId++;
        PropTypes.validateWithErrors({
            level: PropTypes.oneOf([WARN, ERROR]).isRequired,
            text: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired
        }, this, this.constructor.name);
    }
}