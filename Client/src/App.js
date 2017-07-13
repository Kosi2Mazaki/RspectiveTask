import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Home from './Components/Home';
import Login from './Components/Login';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Nav, NavItem, Grid, Row, Col, Panel } from 'react-bootstrap';


class App extends Component {
  render() {
    return (
      <div>
        <Panel>
          <div className="App">
            <Grid className="App-header">
              <Row className="show-grid">
                <Col xs={12} md={8} >
                  <h2>Welcome to RspectiveTaskValidator</h2>
                </Col>
                <Col xs={6} md={4}>
                  <img src={logo} className="icon-animation" alt="logo" />
                </Col>
              </Row>
            </Grid >
          </div>
        </Panel>


        <div>
          <Router>
            <Grid>
              <Row>
                <Panel>
                  <Col xs={6}>
                    <Link to="/login">Login</Link>

                  </Col>
                  <Col xs={6}>
                    <Link to="/home">Home</Link>
                  </Col>
                </Panel>
              </Row>
              <Row>
                <Panel>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/home" component={Home} />
                </Panel>
              </Row>
            </Grid >
          </Router >
        </div>
      </div >
    );
  }
}

export default App;
