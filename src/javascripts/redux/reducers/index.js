import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './userReducer'
import authReducer from './authReducer'
import systemReducer from './systemReducer'
import boxMessagesReducer from './boxMessagesReducer'

var combinedReducers = combineReducers({
    routing: routerReducer,
    auth: authReducer,
    user: userReducer,
    system: systemReducer,
    boxMessages: boxMessagesReducer
});

export default combinedReducers