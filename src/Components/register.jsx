import React from 'react';
import '../App.css'
import { root } from '../dockerTest'

export class Register extends React.Component {
    initialState = { username: '', password: '', passwordConfirmation: '', info: '', registered: false };

    constructor(props) {
        super(props);
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
        this.register = this.register.bind(this);
        this.state = this.initialState;
    }

    register(event) {
        event.preventDefault();
        const { username, password, passwordConfirmation } = this.state;
        var url = root + '/api/user/';
        var data = { username: username, password: password };
        var self = this;

        if (username === '' || password === '' || passwordConfirmation === '') {
            this.setState({ info: 'Please fill all inputs' });
            return;
        }

        if (password !== passwordConfirmation) {
            this.setState({ info: 'Passwords do not match.' });
            return;
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            }
        }).then(
            function (response) {
                if (response.status !== 201) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    self.setState({ info: 'Connection error.' });
                    return;
                }

                console.log(response);
                self.setState({ info: 'Registration successful. You can login now.', registered: true });
            }
        )
            .catch(function (error) {
                self.setState({ info: 'Connection error.' });
                console.error('Error:', error);
            });
    }

    handleLoginChange(event) {
        this.setState({ username: event.target.value, info: '' });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value, info: '' });
    }

    handlePasswordConfirmationChange(event) {
        this.setState({ passwordConfirmation: event.target.value, info: '' });
    }

    render() {
        if (this.state.registered) {
            return (
                <div className="container">
                    <Info text={this.state.info} additionalClass={'text-success'} />
                </div>
            );
        }
        else {
            return (
                <form onSubmit={this.register} className="container">
                    <h3>Register new user</h3>
                    <div className="form-group">
                        <label htmlFor="registrationUsername">Username</label>
                        <input id="registrationUsername" className="form-control mr-sm-2" type="text"
                            autoComplete='off'
                            value={this.state.username}
                            onChange={this.handleLoginChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="registrationPassword">Password</label>
                        <input id="registrationPassword" className="form-control mr-sm-2" type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="registrationConfirmPassword">Confirm password</label>
                        <input id="registrationConfirmPassword" className="form-control mr-sm-2" type="password"
                            value={this.state.passwordConfirmation}
                            onChange={this.handlePasswordConfirmationChange} />
                    </div>
                    <button className="btn btn-primary" type="submit">Register</button>
                    <Info text={this.state.info} additionalClass={'text-danger'} />
                </form>
            );
        }
    }
}

function Info(props) {
    if (props.text)
        return (<span className={'fade-in ml-2 ' + props.additionalClass}>{props.text}</span>);
    else
        return (null);
}