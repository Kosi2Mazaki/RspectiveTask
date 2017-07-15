import { combineReducers } from 'redux'
import visibilityFilter from './taskReducer'
import user from './userReducer'
import alert from './alertReducer'
import { combineForms } from 'react-redux-form'
import { createStore } from 'redux';

/**
 * Creates a Redux storage
 */
const store = createStore(combineReducers({
    alert,
    visibilityFilter,
    user,
    userForm: combineForms({
        username: "",
        password: ""
    }, 'userForm')
}));
export default store;
