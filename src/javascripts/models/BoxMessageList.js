import PropTypes from 'prop-types'
import BoxMessage from './BoxMessage'

export default class BoxMessageList{
    constructor(items = []){
        this.items = items;
        PropTypes.validateWithErrors({
            items: PropTypes.arrayOf(BoxMessage).isRequired
        }, this, this.constructor.name);
    }
}

BoxMessageList.prototype.add = function(level, text){
    this.items.push(new BoxMessage(level, text))
}

BoxMessageList.prototype.remove = function(messageId){
    let index = this.items.findIndex(messageId)
    if ( index !== -1 ){
        this.items.splice(index, 1)
        return this.items;
    }
}