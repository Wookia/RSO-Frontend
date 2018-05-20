import React from 'react';
import {callReservations, callOrders, callGetUsers } from '../dockerTest.js';

export class TestButtons extends React.Component {
    constructor(props)
    {
        super(props);
        this.getTables = this.getTables.bind(this);
        this.getOrders = this.getOrders.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.state = {body: ''};
    }

    getTables() {
        var self = this;
        callReservations()
        .then((success) =>
        {
            self.setState({body: success})
        });
    }

    getOrders()
    {
        callOrders()
            .then(success => success.json())
            .then(obj => this.setState({body: JSON.stringify(obj)}))
            .catch(err => this.setState({body: err}));
    }

    getUsers()
    {
        var self = this;
        callGetUsers(this.props.token)
        .then((success) =>
        {
            success.json().then((response) => {
                self.setState({body: JSON.stringify(response)})
            })
            .catch((err) => {console.log(err);});
        })
        .catch((err) => {console.log(err);});
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <div className="btn-group" role="group">
                    <button onClick={this.getTables} className="btn btn-default">Call Reservations</button>
                    <button onClick={this.getOrders} className="btn btn-default">Call Orders</button>
                    {
                        (this.props.isLoggedIn ?
                            <button onClick={this.getUsers} className="btn btn-default">Get Users</button>
                        :
                        null)
                    }
                </div>
                <br />
                {this.state.body}
            </div>
        )
    };
}