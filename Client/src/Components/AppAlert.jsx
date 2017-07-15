import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as alertActions from '../Actions/alertActions'

/**
 * Class used to display global messages to the user
 */
class AppAlert extends Component {
    render() {
        if (this.props.alert.show) {
            return (
                <div>
                    <Alert bsStyle={this.props.alert.type} onDismiss={() => this.props.hideAlert()}>
                        <h4>
                            {this.props.alert.type === alertActions.AlertType.ERROR ? <strong>ERROR: </strong> : null}
                        </h4>
                        {this.props.alert.message}
                        <p>
                        </p>
                    </Alert>
                </div >
            )
        }

        return null;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hideAlert: () => {
            dispatch(alertActions.hideAlert())
        }
    }
}

const mapStateToProps = state => {
    return {
        alert: state.alert
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppAlert)
