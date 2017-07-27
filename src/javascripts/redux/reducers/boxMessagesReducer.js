import { BOX_MESSAGE_ADD_TYPICAL_MESSAGE, BOX_MESSAGE_REMOVE_MESSAGE } from '../actions/BoxMessagesActions'

export default function (state, action) {
    state = state || [];

    switch (action.type) {
        case BOX_MESSAGE_ADD_TYPICAL_MESSAGE:
            state.boxMessages.add(action.level, action.text)
            return {...state, boxMessages: state.boxMessages } 
        
        case BOX_MESSAGE_REMOVE_MESSAGE:
            state.boxMessages.remove(action.messageId)
            return {...state, boxMessages: state.boxMessages }
        
        default:
            return state;
    }
};