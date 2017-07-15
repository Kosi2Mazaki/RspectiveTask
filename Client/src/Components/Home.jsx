import React, { Component } from 'react'
import { requestProxy } from '../appconfig'
import { Button } from 'react-bootstrap'
import * as alertActions from '../Actions/alertActions'
import { connect } from 'react-redux'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: ["a", "b"]
        }
    }

    componentWillMount() {
        // this.props.history.push('/')
    }
    fetchData() {
        requestProxy.get('/tasks')
            .then(function () {

            }).catch(function (error) {
                console.log("ERROR")

                //         break;
                // }
            });
    }

    render() {
        return (
            <div>
                <Button onClick={this.fetchData.bind(this)}> Fetch </Button>
                {
                    this.state.data.map((elem, i) => {
                        return <div key={i}> {elem} </div>
                    })
                }
            </div >
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAlertType: (type) => {
            dispatch(alertActions.setType(type))
        },
        showAlert: (message) => {
            dispatch(alertActions.showAlert(message))
        }
    }
}

export default connect(

    mapDispatchToProps
)(Home)
