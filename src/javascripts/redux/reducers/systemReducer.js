import { CHANGE_APP_SETTINGS } from '../actions/DevActions'
import AppSystemSettings from './../../models/AppSystemSettings'

export default function (state, action) {
    state = state || [];

    switch (action.type) {
        case CHANGE_APP_SETTINGS:
            return {...state, system: {...state.system, ...(new AppSystemSettings(action.data)) } }

        default:
            return state;
    }
};