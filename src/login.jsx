import React from 'react';

export class Login extends React.Component {
    constructor(props) {
      super(props);
      this.handleLoginChange = this.handleLoginChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.login = this.login.bind(this);
      this.state = {username: '', password: '', info: ''}
    }

    login(event)
    {
        var username = this.state.username;
        var password = this.state.password;
        if (this.tryLogin(username, password))
        {
            this.props.loginSuccessfull(username);
        }
        else
        {
            this.setState({info: 'Podano błędny login lub hasło'});
        }
        event.preventDefault();
    }

    tryLogin(username, password)
    {
        return username === 'teemka' && password === 'teemka';
    }

    handleLoginChange(event) {
        this.setState({username: event.target.value, info: ''});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value, info: ''});
    }
  
    render() {
        if (this.props.user.loggedIn)
        {
            return (
                <div className="form-inline">
                    <NavbarInfo text={"Hello " + this.props.user.login} />
                    <button className="btn my-2 my-sm-0" onClick={this.props.logOut}>Logout</button>
                </div>
            );
        }
        else
        {
            return (
                <form className="form-inline" onSubmit={this.login}>
                    <NavbarInfo text={this.state.info} additionalClass={'text-danger'}/>
                    <input className="form-control mr-sm-2" type="text" placeholder="username" 
                        value={this.state.username} 
                        onChange={this.handleLoginChange}/>
                    <input className="form-control mr-sm-2" type="password" placeholder="password" 
                        value={this.state.password} 
                        onChange={this.handlePasswordChange}/>                    
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
                </form>
            );
        }
    }
}

function NavbarInfo(props) {
    if (props.text)
        return(<span className={'navbar-text ' + props.additionalClass} style={{marginRight: '.5em'}}>{props.text}</span>);
    else
        return(null);
}