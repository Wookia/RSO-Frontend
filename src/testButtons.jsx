import React from 'react';
import { callAuth, callReservations, callOrders } from './script.js';
import 'bootstrap-css'

export function TestButtons() {
    return (
        <div style={{textAlign: 'center'}}>
            <div className="btn-group" role="group">
            <button onClick={callAuth} className='btn btn-default'>Call Auth</button>
            <button onClick={callReservations} className="btn btn-default">Call Reservations</button>
            <button onClick={callOrders} className="btn btn-default">Call Orders</button>
            </div>
        </div>
    );
}
        