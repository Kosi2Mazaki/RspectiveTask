import React, { Component } from 'react'
import { Control, Form, actions } from 'react-redux-form'
import * as userActions from '../Actions/userActions'
import * as alertActions from '../Actions/alertActions'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { requestProxy } from '../appconfig'
import history from '../appconfig'

/**
 * Class responsible for user management.
 * Will show a login form when user is not logged in and
 * Username and logout button when user is logged in
 */
class UserForm extends Component {

    handleSubmit(user) {
        var dispatcher = this.formDispatch;
        requestProxy.post('/authenticate',
            { name: user.username, password: user.password })
            .then(response => {
                //save token and username
                dispatcher(userActions.logInUser({
                    username: user.username,
                    token: response.data
                }));
                // show info
                dispatcher(
                    alertActions.setType(
                        alertActions.AlertType.INFO
                    ));
                dispatcher(
                    alertActions.showAlert(
                        "You were successfully logged in."
                    ));
                // clear form
                dispatcher(actions.reset('userForm.username'))
                dispatcher(actions.reset('userForm.password'))
                // history.push('/home')
                // window.location.reload()
            }).catch(function (error) {
                dispatcher(
                    alertActions.setType(
                        alertActions.AlertType.ERROR
                    ));
                dispatcher(
                    alertActions.showAlert(
                        error.response.status + ' (' + error.response.statusText + '): ' + error.response.data
                    ));
            });
    }

    /**
     * Function used by redux-form to obtain dispatch object
     * @param {Object} dispatch 
     */
    attachDispatch(dispatch) {
        this.formDispatch = dispatch;
    }

    render() {
        if (!this.props.user.username) {
            return (
                <div>
                    < Form
                        model="userForm"
                        getDispatch={(dispatch) => this.attachDispatch(dispatch)}
                        onSubmit={(userForm) => this.handleSubmit(userForm)}>
                        <Control.text
                            placeholder="Username"
                            model="userForm.username"
                            id="userForm.username" />
                        <Control.text
                            placeholder="Password"
                            type="password"
                            model="userForm.password"
                            id="userForm.password" />
                        <p>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </p>
                    </Form >

                </div>
            )
        } else {
            return (
                <div>
                    <div className="list-group-item-success">
                        Logged as: {this.props.user.username}
                    </div>
                    <Button
                        bsStyle="primary"
                        onClick={() => this.props.onUserLogout()}>
                        Logout
                    </Button>
                </div>
            )
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUserLogout: () => {
            dispatch(userActions.logOutUser())
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserForm)
