import React, { Component } from 'react';
import { TestButtons } from './Components/testButtons';
import { Login } from './Components/login'

const initialState = {user: {login: '', loggedIn: false}}

class App extends Component {
  constructor(props) {
    super(props);
    this.loginSuccessfull = this.loginSuccessfull.bind(this);
    this.logOut = this.logOut.bind(this);
    this.state = initialState;
  }

  loginSuccessfull(username, token)
  {
    this.setState({user: {login: username, loggedIn: true, token: token}});
  }

  logOut()
  {
    this.setState(initialState);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light justify-content-between" style={{flexDirection: 'row'}}>
          <span className="navbar-brand">RSO</span>
          <Login user={this.state.user} loginSuccessfull={this.loginSuccessfull} logOut={this.logOut}/>
        </nav>
        <TestButtons token={this.state.user.token} isLoggedIn={this.state.user.loggedIn}/>
      </div>
    );
  }
}

export default App;
