import React from 'react';
import { OrderList } from './orderList';
import { AddOrder } from './addOrder';
import { OrderDetails } from './orderDetails';

export class Orders extends React.Component {
    initialState = {selected: 0, order: null};

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

    render() {
        if (this.state.selected === 0) {
            return <OrderList user={this.props.user} addNewOrder={this.setAddNewOrder} orderDetails={this.setOrderDetails} menuItems={this.props.menuItems} />
        }
        else if (this.state.selected === 1)
            return <AddOrder user={this.props.user} returnFunction={this.setList} tables={this.props.tables} menuItems={this.props.menuItems} />
        else 
            return <OrderDetails user={this.props.user} order={this.state.order} returnFunction={this.setList} menuItems={this.props.menuItems}/>
    }
}