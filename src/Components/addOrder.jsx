import React from 'react';
import '../App.css'
import { addOrder, getMenuItems } from '../dockerTest'
import { BadgeActionList } from './badgeActionList'
import '../tools/helperFunctions'

const tables = [...Array(15).keys()]

export class AddOrder extends React.Component {
    initialState = { table: '', dishes: [], menuItems: [], totalPrice: 0 };

    constructor(props) {
        super(props);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.deleteDishClick = this.deleteDishClick.bind(this);
        this.addDish = this.addDish.bind(this);
        this.addNewOrder = this.addNewOrder.bind(this);
        this.state = this.initialState;
    }

    componentDidMount() {
        this.setState({ isLoading: true, info: 'Loading...' });

        getMenuItems()
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.setState({ menuItems: data, isLoading: false, info: '' }))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    addDish(item) {
        this.setState((prevState) => {
            return { 
                dishes: [...prevState.dishes, item],
                totalPrice: prevState.totalPrice + item.price
            }
        });
    }

    async addNewOrder(e) {
        e.preventDefault();
        const { table, dishes } = this.state;
        var data = { table: table, waiter: this.props.user.login, state: 'start', dishes: dishes.map(dish => dish.id) };

        if (!table) {
            this.setState({ info: 'Please select table.' });
            return;
        }

        if (dishes.length === 0) {
            this.setState({ info: 'Please add at least one dish.' });
            return;
        }

        try {
            await addOrder(data)
            this.props.toggler();
        } catch(err) {
            this.setState({ info: err.message });
        }
    }

    handleTableChange(event) {
        this.setState({ table: parseInt(event.target.value, 10), info: '' });
    }

    deleteDishClick(dish, dishIndex) {
        this.setState((prevState) => {
            return { 
                dishes: prevState.dishes.immutableDeleteAt(dishIndex),
                totalPrice: prevState.totalPrice - dish.price
            };
        });
    }

    infoInContainer(info) {
        return (
            <div className="container">
                <Info text={info} additionalClass={'text-success'} />
            </div>
        )
    }

    render() {
        if (this.state.isLoading)
            return this.infoInContainer(this.state.info);
        if (this.state.error)
            return this.infoInContainer(this.state.error.message);

        return (
            <form onSubmit={this.addNewOrder} className="container">
                <h3>Add New Order</h3>
                <Select title={'Table'} 
                    value={this.state.table} 
                    changeFunction={this.handleTableChange} 
                    options={tables}
                    optionFunction={(val) => {
                        return <option key={val} value={val}>Table {val}</option>
                    }} />
                <BadgeActionList actionFunction={this.addDish} items={this.state.menuItems} badgeText='Add' badgeColor='primary'/>
                <button className="btn btn-primary" type="submit">Add Order</button>
                <button className="btn btn-default" style={{float: 'right'}} onClick={this.props.toggler}>Return</button>
                <Info text={this.state.info} additionalClass={'text-danger'} />
                <hr />
                <Summary count={this.state.dishes.length} price={this.state.totalPrice} />
                <BadgeActionList actionFunction={this.deleteDishClick} items={this.state.dishes} badgeText='Delete' badgeColor='danger'/>
            </form>
        );
    }
}

function Summary(props) {
    if (props.count === 0)
        return (null);
    else
        return (
        <div>
            <h4>Summary:</h4>
            <div>Total dishes: <strong>{props.count}</strong></div>
            <div>Total price: <strong>{props.price} zł</strong></div>
        </div>);
}

function Select(props) {
    return (
        <div className="form-group">
            <label >{props.title}</label>
            <select className="form-control mr-sm-2"
                value={props.value}
                onChange={props.changeFunction}>
                <option value=''></option>
                {props.options.map((val) => {
                    return props.optionFunction(val);
                })}
            </select>
        </div>
    );
}

function Info(props) {
    if (props.text)
        return (<span className={'fade-in ml-2 ' + props.additionalClass}>{props.text}</span>);
    else
        return (null);
}