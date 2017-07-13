import React from 'react';
import { connect } from 'react-redux';
import store from '../path/to/store';
import axios from 'axios';
import UserList from '../views/list-user';

const UserListContainer = React.createClass({
    componentDidMount: function () {
        axios.get('/path/to/user-api').then(response => {
            store.dispatch({
                type: 'USER_LIST_SUCCESS',
                users: response.data
            });
        });
    },

    render: function () {
        return <UserList users={this.props.users} />;
    }
});

const mapStateToProps = function (store) {
    return {
        users: store.userState.users
    };
}

export default connect(mapStateToProps)(UserListContainer);