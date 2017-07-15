import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Home from './Components/Home'
import AppAlert from './Components/AppAlert'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import store from './Reducers/appReducer'
import User from './Components/User'
import * as userActions from './Actions/userActions'
import Navigator from './Components/Navigator'

userActions.checkLocalStorage(store)


// let next = store.dispatch
// store.dispatch = function dispatchAndLog(action) {
//   console.log('dispatching', action)
//   let result = next(action)
//   console.log('next state', store.getState())
//   return result
// }
// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// );
// unsubscribe();

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <div>
          <Panel>
            <div className="App">
              <Grid className="App-header">
                <Row className="show-grid">
                  <Col xs={6} md={8} >
                    <h2>Welcome to RspectiveTaskValidator</h2>
                  </Col>
                  <Col xs={2} md={2}>
                    <img src={logo} className="icon-animation" alt="logo" />
                  </Col>

                </Row>
              </Grid >
            </div>
          </Panel>

          <div>
            <Router>
              <Panel>
                <AppAlert />

                <Link to="/todos">Home</Link>
                <Link to="/user">Login</Link>


                <Panel>
                  <Route path="/user" component={User} />
                  <Navigator path="/todos" component={Home} />
                </Panel>
              </Panel>
            </Router>
          </div>
        </div >
      </Provider >


      // <Provider store={store} >
      //   <div>
      //     <Panel>
      //       <div className="App">
      //         <Grid className="App-header">
      //           <Row className="show-grid">
      //             <Col xs={6} md={8} >
      //               <h2>Welcome to RspectiveTaskValidator</h2>
      //             </Col>
      //             <Col xs={2} md={2}>
      //               <img src={logo} className="icon-animation" alt="logo" />
      //             </Col>

      //           </Row>
      //         </Grid >
      //       </div>
      //     </Panel>

      //     <div>
      //       <Router>
      //         <Grid>
      //           <Row>
      //             <Panel>

      //               <AppAlert />


      //               <Col xs={6}>

      //               </Col>
      //               <Col xs={6}>
      //                 <Link to="/home">Home</Link>
      //                 <Link to="/user">Login</Link>
      //               </Col>
      //             </Panel>
      //           </Row>
      //           <Row>
      //             <Panel>
      //               <Route path="/user" component={User} />
      //               <Navigator path="/home" component={Home} />
      //             </Panel>
      //           </Row>
      //         </Grid >
      //       </Router >
      //     </div>
      //   </div >
      // </Provider >
    );
  }
}

export default App;
