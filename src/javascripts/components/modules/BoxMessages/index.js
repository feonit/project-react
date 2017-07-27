import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import './style.scss'
import { removeMessage } from '../../../redux/actions/BoxMessagesActions'
import { WARN } from '../../../models/BoxMessage'

class BoxMessages extends Component{
    constructor(props){
        super(props)
        this.removeMessage = this.props.removeMessage.bind(this)
    }
    
    render(){
        let list;
        
        list = this.props.messages.map( (message, index) => {
            return (
                <div key={"BoxMessages"+index} className={classNames("error-message-box animated", { "warn" : message.type === WARN })}>
                    <div className="box-text">
                        {message.message}
                    </div>
                    <i onClick={this.removeMessage.bind(this, message.id)} className="close-btn">&#10005;</i>
                </div>
            )
        });

        return (
            <div className="error-message-container">
                {list || ""}
            </div>
        )
    }
}

BoxMessages.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object)
}

BoxMessages.defaultProps = { messages: [] }

let BoxMessagesConnect = connect( state => ({
    boxMessages: state.boxMessages
}), dispatch => ({
    removeMessage: id => dispatch(removeMessage(id))
}))(BoxMessages)

export default BoxMessagesConnect