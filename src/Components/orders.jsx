import React from 'react';
import { OrderList } from './orderList';
import { AddOrder } from './addOrder';
import { OrderDetails } from './orderDetails';
import { getMenuItems } from '../dockerTest'

export class Orders extends React.Component {
    initialState = {selected: 0, menuItems: [], order: null, isLoading: true, error: ''};

    constructor(props) {
      super(props);
      this.setAddNewOrder = this.setAddNewOrder.bind(this);
      this.setOrderDetails = this.setOrderDetails.bind(this);
      this.setList = this.setList.bind(this);
      this.state = this.initialState;
    }

    setAddNewOrder() {
        this.setState({selected: 1});
    }

    setOrderDetails(order) {
        this.setState({selected: 2, order: order});
    }

    setList() {
        this.setState({selected: 0});
    }

    componentDidMount() {
        getMenuItems(this.props.user.token)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.setState({ menuItems: data, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        if (this.state.error) {
            return <span>{this.state.error.message}</span>
        }

        if (this.state.isLoading) {
            return <span>Loading...</span>
        }

        if (this.state.selected === 0) {
            return <OrderList user={this.props.user} addNewOrder={this.setAddNewOrder} orderDetails={this.setOrderDetails} menuItems={this.state.menuItems} />
        }
        else if (this.state.selected === 1)
            return <AddOrder user={this.props.user} returnFunction={this.setList} tables={this.props.tables} menuItems={this.state.menuItems} />
        else 
            return <OrderDetails user={this.props.user} order={this.state.order} returnFunction={this.setList} menuItems={this.state.menuItems}/>
    }
}