import React, { Component } from 'react';
import { Login } from './Components/login'
import { Register } from './Components/register'
import { Tabs } from './Components/tabs'
import jwt from 'jsonwebtoken';

const initialState = { user: { login: '', loggedIn: false, token: '', id: '', role: null, iat: null, expiration: null }};
export const localStorageKey = 'reactState';

export class App extends Component {
  constructor(props) {
    super(props);
    this.loginSuccessfull = this.loginSuccessfull.bind(this);
    this.logOut = this.logOut.bind(this);
    if (this.props.savedState === null)
      this.state = initialState;
    else
      this.state = this.props.savedState;
  }

  loginSuccessfull(username, token) {
    const decoded = jwt.decode(token);
    let nextState = {
      user: {
        login: username,
        loggedIn: true,
        token: token,
        id: decoded.id,
        role: decoded.role, 
        iat: new Date(decoded.iat * 1000),
        expiration: new Date(decoded.exp * 1000)
      }
    };
    localStorage.setItem(localStorageKey, JSON.stringify(nextState));
    this.setState(nextState);
  }

  logOut() {
    localStorage.setItem(localStorageKey, JSON.stringify(initialState));
    this.setState(initialState);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light justify-content-between" style={{ flexDirection: 'row' }}>
          <span className="navbar-brand">RSO</span>
          <Login user={this.state.user} loginSuccessfull={this.loginSuccessfull} logOut={this.logOut} />
        </nav>
        {
          this.state.user.loggedIn ?
            <Tabs user={this.state.user} />
            :
            <Register loggedIn={this.state.user.loggedIn} />
        }
      </div>
    );
  }
}

export default App;
