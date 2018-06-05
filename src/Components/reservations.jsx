import React from 'react';
import '../tools/helperFunctions'
import { getAllReservations, realizeReservation, deleteReservation } from '../dockerTest'

export class Reservations extends React.Component {
    initialState = { reservations: [] };

    constructor(props) {
        super(props);
        this.deleteReservationClick = this.deleteReservationClick.bind(this);
        this.state = this.initialState;
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        getAllReservations()
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.setState({ reservations: data, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    async realizeReservationClick(reservation) {
        await realizeReservation(reservation.id_reservation);
        reservation.realized = true;
        this.setState(prevState => {
            var index = prevState.reservations.indexOf(reservation);
            var newReservations = prevState.reservations.slice();
            newReservations[index] = reservation;
            return {reservations: newReservations};
        });
    }

    async deleteReservationClick(reservation) {
        await deleteReservation(reservation.id_reservation);
        this.setState(prevState => {
            var index = this.state.reservations.indexOf(reservation);
            var newReservations = prevState.reservations.immutableDeleteAt(index);
            return {reservations: newReservations};
        });
    }

    render() {
        const { reservations, isLoading, error } = this.state;

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
                        <th>
                            Table
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Seats
                        </th>
                        <th>
                            Is Realized
                        </th>
                        <th>
                            From
                        </th>
                        <th>
                            To
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((item) => {
                        var dateFrom = new Date(item.from_time);
                        var dateTo = new Date(item.to_time);
                        return (
                            <tr key={item.id_reservation}>
                                <td>{item.id_table}</td>
                                <td>{item.name}</td>
                                <td>{item.amount}</td>
                                <td>{item.realized? 
                                    <span className='text-success'>realized</span>:
                                    <span className='text-danger'>Not realized</span>
                                }</td>
                                <td>{dateFrom.toLocaleString()}</td>
                                <td>{dateTo.toLocaleString()}</td>
                                <RealizeDeletePills item={item} deleteFunction={() => this.deleteReservationClick(item)} realizeFunction={() => this.realizeReservationClick(item)} />
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        )
    }
}

function RealizeDeletePills(props) {
    var item = props.item;
    const realizePill = (<span style={{cursor: 'pointer', marginRight: '0.25em'}} 
                        onClick={props.realizeFunction} 
                        className={'badge badge-pill badge-primary'}>
                            Realize
                        </span>);

    const deletePill = (    <span style={{cursor: 'pointer'}} 
                                onClick={props.deleteFunction} 
                                className={'badge badge-pill badge-danger'}>
                                    Delete
                            </span>);

    if (item.realized)
        return <td>{deletePill}</td>
    else
        return <td>{realizePill}{deletePill}</td>
}