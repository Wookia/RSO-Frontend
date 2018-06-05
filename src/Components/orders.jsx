import React from 'react';
import { OrderList } from './orderList';
import { AddOrder } from './addOrder';

export class Orders extends React.Component {
    initialState = {listSelected: true};

    constructor(props) {
      super(props);
      this.toggleSelection = this.toggleSelection.bind(this);
      this.state = this.initialState;
    }

    toggleSelection() {
        this.setState((prevState) => {
            return {listSelected: !prevState.listSelected};
        });
    }

    render() {
        if (this.state.listSelected) {
            return <OrderList toggler={this.toggleSelection} />
        }
        else
            return <AddOrder user={this.props.user} toggler={this.toggleSelection} tables={this.props.tables} />
    }
}