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

    updateStatusClick(item, index) {
        
    }

    render() {
        const { orders, isLoading, error } = this.state;

        if (error) {
            return <span className="text-danger">{error.message}</span>
        }

        if (isLoading) {
            return <span>Loading...</span>
        }

        var addButton = null;
        if (this.props.user.role === 2) { // waiter
            addButton = <button onClick={this.props.addNewOrder} className="btn btn-primary" style={{float: 'right'}}>Add New Order</button>
        }

        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Table</th>
                            <th>Waiter</th>
                            <th>State</th>
                            <th>Dishes amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, index) => {
                        return (
                            <tr key={order.id}>
                                <td>{order.table}</td>
                                <td>{order.waiter}</td>
                                <td>{order.state}</td>
                                <td>{order.dishes.length}</td>
                                <ActionColumn role={this.props.user.role} order={order} showMoreClick={() => this.props.orderDetails(order)}
                                    updateStatusClick={() => this.updateStatusClick(order, index)}/>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                {addButton}
            </div>
        )
    }
}

function ActionColumn(props) {
    var updatePill =    <span style={{cursor: 'pointer', marginRight: '0.25em'}} 
                            onClick={props.updateStatusClick} 
                            className={'badge badge-pill badge-success'}>
                                Update
                        </span>;
    
    var detailsPill =  <span style={{cursor: 'pointer'}} 
                            onClick={props.showMoreClick} 
                            className={'badge badge-pill badge-primary'}>
                                More
                        </span>
    if (props.role === 1 && props.order.state !== 'end') {
        return  <td>{updatePill}{detailsPill}</td>
    }
    else
        return <td>{detailsPill}</td>;
}