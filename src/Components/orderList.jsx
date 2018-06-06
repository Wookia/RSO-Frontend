import React from 'react';
import { callOrders, deleteDish } from '../dockerTest'
import '../tools/helperFunctions'

export class OrderList extends React.Component {
    initialState = {orders: []};

    constructor(props) {
      super(props);
      this.deleteDishClick = this.deleteDishClick.bind(this);
      this.state = this.initialState;
    }

    componentDidMount() {
        this.setState({isLoading: true});

        callOrders(this.props.user.token)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.setState({orders: data, isLoading: false}))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    deleteDishClick(e, orderId, dishId, index) {
        e.preventDefault();
        deleteDish(orderId, dishId, this.props.user.token)
            .then(response => {
                if (response.ok) {
                    this.setState(
                        {orders: this.state.orders.map((order) => 
                            orderId === order.id ?
                            {...order, dishes: order.dishes.immutableDeleteAt(index)}
                            : order)}
                        );
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        const { orders, isLoading, error } = this.state;

        if (error) {
            return <span className="text-danger">{error.message}</span>
        }

        if (isLoading) {
            return <span>Loading...</span>
        }

        return (
            <div>
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
                    {orders.map((order) => {
                        return (
                            <tr key={order.id}>
                                <td>{order.table}</td>
                                <td>{order.waiter}</td>
                                <td>{order.state}</td>
                                <td>{order.dishes && order.dishes.length !== 0 ?
                                        order.dishes
                                            .map((dish, index) => 
                                                <a href="" key={index} onClick={(e) => this.deleteDishClick(e, order.id, dish, index)}>{dish}</a>)
                                            .reduce((prev, curr) => [prev, ', ', curr]) 
                                        : null}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <button onClick={this.props.toggler} className="btn btn-primary" style={{float: 'right'}}>Add New Order</button>
            </div>
        )
    }
}