import React from 'react';
import '../App.css'
import { addOrder, getMenuItems } from '../dockerTest'

const tables = [...Array(15).keys()]

export class AddOrder extends React.Component {
    initialState = { table: '', currentDish: '', dishes: [], menuItems: [] };

    constructor(props) {
        super(props);
        this.handleDishChange = this.handleDishChange.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.deleteDishClick = this.deleteDishClick.bind(this);
        this.addDishClick = this.addDishClick.bind(this);
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

    addDishClick(e) {
        e.preventDefault();
        if (this.state.currentDish)
            this.setState((prevState) => {
                return { dishes: [...prevState.dishes, parseInt(prevState.currentDish, 10)] }
            });
    }

    addNewOrder(e) {
        e.preventDefault();
        const { table, dishes } = this.state;
        var data = { table: table, waiter: this.props.user.login, state: 'start', dishes: dishes };

        if (!table) {
            this.setState({ info: 'Please select table.' });
            return;
        }

        if (dishes.length === 0) {
            this.setState({ info: 'Please add at least one dish.' });
            return;
        }

        addOrder(data)
            .then(response => { this.props.toggler() })
            .catch(err => this.setState({ info: err.message }))
    }

    handleTableChange(event) {
        this.setState({ table: parseInt(event.target.value, 10), info: '' });
    }

    handleDishChange(event) {
        this.setState({ currentDish: event.target.value, info: '' });
    }

    deleteDishClick(e, dishIndex) {
        e.preventDefault();
        this.setState((prevState) => {
            let newDishes = prevState.dishes.slice();
            newDishes.splice(dishIndex, 1);
            return { dishes: newDishes };
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
                <Select title={'Add dish'} 
                    value={this.state.currentDish} 
                    changeFunction={this.handleDishChange} 
                    options={this.state.menuItems}
                    optionFunction={(item) => {
                        return <option key={item.id} value={item.id} title={item.description}>{item.name} - {item.price} zł</option>
                    }} />
                <button className="btn btn-default" onClick={this.addDishClick}>Add dish</button>
                <button className="btn btn-primary" type="submit" style={{ float: 'right' }}>Add Order</button>
                <Info text={this.state.info} additionalClass={'text-danger'} />
                <hr />
                Dishes:
                    {this.state.dishes && this.state.dishes.length !== 0 ?
                    this.state.dishes
                        .map((dish, index) =>
                            <a href="" key={index} onClick={(e) => this.deleteDishClick(e, index)}>{dish}</a>)
                        .reduce((prev, curr) => [prev, ', ', curr])
                    : null}
            </form>
        );
    }
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