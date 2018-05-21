import React, { Component } from 'react';
import { Login } from './Components/login'
import { Register } from './Components/register'
import { Tabs } from './Components/tabs'

const initialState = { user: { login: '', loggedIn: false, token: '' } };
export const localStorageKey = 'reactState';

export class App extends Component {
  constructor(props) {
    super(props);
    this.loginSuccessfull = this.loginSuccessfull.bind(this);
    this.logOut = this.logOut.bind(this);
    if (this.props.savedState === undefined)
      this.state = initialState;
    else
      this.state = this.props.savedState;
  }

  loginSuccessfull(username, token) {
    let nextState = { user: { login: username, loggedIn: true, token: token } };
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
