import React from 'react';
import { SelectTable, Info, Select } from './addOrder'
import { addReservation } from '../dockerTest'

export class AddReservation extends React.Component {
    initialState = { 
        added: false,
        info: '', 
        table: null, 
        date: formatDate(new Date()), 
        timeFrom: `${((new Date().getHours() + 1) % 24).toString().padStart(2, '0')}:00:00`, 
        timeTo: `${((new Date().getHours() + 2) % 24).toString().padStart(2, '0')}:00:00`, 
        seats: '' };

    constructor(props) {
        super(props);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeFromChange = this.handleTimeFromChange.bind(this);
        this.handleTimeToChange = this.handleTimeToChange.bind(this);
        this.addNewReservation = this.addNewReservation.bind(this);
        this.handleSeatsChange = this.handleSeatsChange.bind(this);
        this.state = this.initialState;
    }

    async addNewReservation(e) {
        e.preventDefault();
        if (this.state.table === null) {
            this.setState({info: 'Please Select Table'});
            return;
        }

        var dateTimeFrom = new Date(this.state.date + ' ' + this.state.timeFrom);
        var dateTimeTo = new Date(this.state.date + ' ' + this.state.timeTo);
        if (dateTimeTo <= dateTimeFrom) {
            this.setState({info: 'Time to can\'t be earlier than time from'});
            return;
        }
        var data = {
            name: this.props.user.login,
            amount: this.state.seats,
            "from_time": dateTimeFrom,
            "to_time": dateTimeTo,
            realized: false,
            "id_table": this.state.table
        }
        try {
            await addReservation(data);
            this.setState({info: 'Reservation Added', added: true});
        } catch (error) {
            this.setState({info: error.message});
        }
    }

    handleTableChange(e, tableId) {
        e.preventDefault();
        if (tableId === this.state.table)
            this.setState({ table: null, info: '' });
        else
            this.setState({ table: tableId, info: '' });
    }

    handleSeatsChange(event) {
        this.setState({ seats: event.target.value });
    }

    handleDateChange(event) {
        this.setState({ date: event.target.value });
    }

    handleTimeFromChange(event) {
        this.setState({ timeFrom: event.target.value });
    }

    handleTimeToChange(event) {
        this.setState({ timeTo: event.target.value });
    }

    render() {
        if (this.state.added){
            return <Info text={this.state.info} />
        }
        if (this.props.tables.isLoading) {
            return <Info text={'Loading...'} />
        }
        let selectedTable = this.props.tables.data.find(item => item.id_table === this.state.table);
        var seatsOptions = [...Array(selectedTable && selectedTable.seats).keys()].map(item => ++item);
        var selectDate;
        var selectTime;
        var selectSeats;
        if (this.state.table !== null) {
            selectDate = <div className='form-group fade-in'>
                <label>Select Date</label>
                <input className='form-control' value={this.state.date} onChange={this.handleDateChange} type='date' />
            </div>
            selectTime = <div className='form-row fade-in'>
                <div className='form-group col-md-6'>
                    <label>Select Time From</label>
                    <input className='form-control' value={this.state.timeFrom} onChange={this.handleTimeFromChange} type='time' min='10:00' max='22:00' step='900' />
                </div>
                <div className='form-group col-md-6'>
                    <label>Select Time To</label>
                    <input className='form-control' value={this.state.timeTo} onChange={this.handleTimeToChange} type='time' min='10:00' max='23:00' step='900' />
                </div>
            </div>
            selectSeats = <Select title={'Select amount of seats'}
                            value={this.state.seats}
                            changeFunction={this.handleSeatsChange}
                            options={seatsOptions}
                            optionFunction={(option) => <option key={option} value={option}>{option} seats</option>}/>
        }
        return (
            <form onSubmit={this.addNewReservation} className="container">
                <h3>Add New Reservation</h3>
                <SelectTable title={'Select table'}
                    value={this.state.table}
                    changeFunction={this.handleTableChange}
                    options={this.props.tables.data} />
                {selectDate}
                {selectTime}
                {selectSeats}
                <button className="btn btn-primary" type="submit">Add Reservation</button>
                <Info text={this.state.info} />
                <hr />
            </form>
        );
    }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}