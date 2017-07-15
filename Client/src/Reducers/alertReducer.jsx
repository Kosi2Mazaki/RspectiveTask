import * as alertActions from '../Actions/alertActions';

/**
 * Initial state for the AppAlert
 */
const initialAlertValue = {
    show: false,
    message: "",
    type: alertActions.AlertType.INFO
}

/**
 * Used to switch AppAlert states
 * @param {Object} state current AppAlert state
 * @param {Object} action used to set a new state
 */
export default function alert(state = initialAlertValue, action) {
    switch (action.type) {
        case alertActions.SHOW_ALERT:
            return {
                ...state,
                show: true,
                message: action.message
            }
        case alertActions.HIDE_ALERT:
            return {
                ...state,
                show: false
            }
        case alertActions.SET_TYPE:
            console.log(action)
            return {
                ...state,
                type: action.messageType
            }
        default:
            return state;
    }
}
