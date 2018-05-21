import React from 'react';
import { callReservations } from '../dockerTest'

export class Reservations extends React.Component {
    initialState = { users: [] };

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        callReservations()
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.setState({ users: data, isLoading: false }))
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item) => {
                        return (
                            <tr>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        )
    }
}