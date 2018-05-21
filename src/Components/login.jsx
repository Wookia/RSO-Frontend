import React from 'react';
import '../App.css'
import { root } from '../dockerTest'

export class Login extends React.Component {
    initialState = { username: '', password: '', info: '', token: '' };

    constructor(props) {
        super(props);
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.login = this.login.bind(this);
        this.logOut = this.logOut.bind(this);
        this.state = this.initialState;
    }

    login(event) {
        event.preventDefault();
        var username = this.state.username;
        var password = this.state.password;
        var url = root + ':8000/auth/';
        var data = { username: username, password: password };
        var self = this;

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            }
        }).then(
            function (response) {
                if (response.status === 401) {
                    self.setState({ info: 'Podano błędny login lub hasło', password: '' });
                    return;
                }
                else if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    self.setState({ info: 'Wystąpił błąd z połączeniem' });
                    return;
                }

                response.json().then((data) => {
                    console.log(data);
                    self.props.loginSuccessfull(username, data.token);
                });
            }
        )
            .catch(function (error) {
                self.setState({ info: 'Wystąpił błąd z połączeniem' });
                console.error('Error:', error);
            });
    }

    handleLoginChange(event) {
        this.setState({ username: event.target.value, info: '' });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value, info: '' });
    }

    logOut() {
        this.setState(this.initialState);
        this.props.logOut();
    }

    render() {
        if (this.props.user.loggedIn) {
            return (
                <div className="form-inline">
                    <NavbarInfo text={"Hello " + this.props.user.login} />
                    <button className="btn my-2 my-sm-0" onClick={this.logOut}>Logout</button>
                </div>
            );
        }
        else {
            return (
                <form className="form-inline" onSubmit={this.login}>
                    <NavbarInfo text={this.state.info} additionalClass={'text-danger'} />
                    <input className="form-control mr-sm-2" type="text" placeholder="username"
                        value={this.state.username}
                        onChange={this.handleLoginChange} />
                    <input className="form-control mr-sm-2" type="password" placeholder="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange} />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
                </form>
            );
        }
    }
}

function NavbarInfo(props) {
    if (props.text)
        return (<span className={'fade-in navbar-text ' + props.additionalClass} style={{ marginRight: '.5em' }}>{props.text}</span>);
    else
        return (null);
}