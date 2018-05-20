import React from 'react';
import { callOrders } from '../dockerTest'

export class Orders extends React.Component {
    initialState = {users: []};

    constructor(props) {
      super(props);
      this.state = this.initialState;
    }

    componentDidMount() {
        this.setState({isLoading: true});

        callOrders()
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
                        <th>Table</th>
                        <th>Waiter</th>
                        <th>State</th>
                        <th>Dishes</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.table}</td>
                            <td>{item.waiter}</td>
                            <td>{item.state}</td>
                            <td>{item.dishes ? item.dishes.join(', ') : null}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        )
    }
}