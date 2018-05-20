import React from 'react';
import '../App.css'
import { callGetUsers } from '../dockerTest'
import { roleIntToString } from '../tools/roles'

export class Users extends React.Component {
    initialState = {users: []};

    constructor(props) {
      super(props);
      this.state = this.initialState;
    }

    componentDidMount() {
        this.setState({isLoading: true});

        if (!this.props.token){
            this.setState({ error: {message: 'Error: not logged in'}, isLoading: false});
            return;
        }

        callGetUsers(this.props.token)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.setState({users: data, isLoading: false}))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        const { users, isLoading, error } = this.state;

        if (error) {
            return <span className="text-danger">{error.message}</span>
        }

        if (isLoading) {
            return <span>Loading...</span>
        }

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Created</th>
                        <th>Modified</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.username}</td>
                            <td>{item.createdAt}</td>
                            <td>{item.updatedAt}</td>
                            <td>{roleIntToString(item.role)}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        )
    }
}