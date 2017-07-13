import React from 'react'

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'

const fakeAuth = {
    isAuthenticated: true,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

const AuthButton = withRouter(({ history }) => (
    fakeAuth.isAuthenticated ? (
        <p>
            Welcome! <button onClick={() => {
                fakeAuth.signout(() => history.push('/'))
            }}>Sign out</button>
        </p>
    ) : (
            <p>You are not logged in.</p>
        )
))

export default function Login({ children }) {
    return (
        <AuthButton />
    )
}