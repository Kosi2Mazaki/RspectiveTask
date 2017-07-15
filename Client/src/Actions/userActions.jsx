import { requestProxy } from '../appconfig'

export const LOG_IN_USER = 'LOG_IN';
export const LOG_OUT_USER = 'LOG_OUT';
export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

/**
 * Used to log in the user
 * @param {Object} user object with username and token set
 */
export function logInUser(user) {
    return { type: LOG_IN_USER, user };
}

/**
 * Used to logout the user. Will clear username and token fields
 */
export function logOutUser() {
    return { type: LOG_OUT_USER };
}

/**
 * Used to login user when page is refreshed.
 * The values will be taken from localStorage, username and token fields
 * will be also set.
 * @param {Object} store Redux global store object
 */
export function checkLocalStorage(store) {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    if (token) {
        requestProxy.defaults.headers.common['Authorization'] = token;
        store.dispatch(logInUser({
            username: user,
            token: token
        }))
    } else {
        requestProxy.defaults.headers.common['Authorization'] = null;
    }
}