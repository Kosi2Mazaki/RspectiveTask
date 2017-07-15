import * as userActions from '../Actions/userActions'
import { history, requestProxy } from '../appconfig'

/**
 * Initial state for the user global storage
 */
export const initialUserState = {
    username: '',
    token: null
}

/**
 * Used to manage user state
 * @param {Object} state current AppAlert state
 * @param {*} action used to set a new state
 */
export default function user(state = initialUserState, action) {
    switch (action.type) {
        case userActions.LOG_IN_USER:
            localStorage.setItem('token', action.user.token)
            localStorage.setItem('user', action.user.username)
            requestProxy.defaults.headers.common['Authorization'] = action.user.token
            return {
                ...state,
                username: action.user.username,
                token: action.user.token
            }
        case userActions.LOG_OUT_USER:
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            delete requestProxy.defaults.headers.common['Authorization']
            return {
                ...state,
                username: '',
                token: null
            }
        default:
            return state;
    }
}
