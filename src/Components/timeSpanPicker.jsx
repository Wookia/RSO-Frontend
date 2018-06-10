import React from 'react';

var slots = [...Array(96).keys()];

export function TimeSpanPicker(props) {
    var date = new Date(props.date);
    var min = new Date(props.date + ' ' + props.minTime);
    var max = new Date(props.date + ' ' + props.maxTime);
    var timeFrom = new Date(`${props.date} ${props.timeFrom}`);
    var timeTo = new Date(`${props.date} ${props.timeTo}`);
    var tableReservations = props.reservations.data.filter(reservation => reservation.id_table === props.table 
        && new Date(reservation.from_time) >= date 
        && new Date(reservation.to_time) <= addDays(date, 1));
    var timeSlots = updateTimeSlot(min, max, props.date, timeFrom, timeTo, tableReservations);

    if (props.reservations.isLoading) {
        return <span>Loading...</span>
    }
    
    if (props.reservations.error) {
        return <span>{props.reservations.error.message}</span>
    }

    return (
        <div className='form-group'>
            {timeSlots.map(slot => {
                return (
                    slot.isHour ?
                        <span key={slot.id} className={getStyle(slot)}>{slot.display}</span>
                        :
                        <span key={slot.id} className={getStyle(slot)}>{slot.display}</span>)
            }
            )}
        </div>
    )
}

function getStyle(slot) {
    var className = 'slotStyle ';
    if (!slot.isHour)
        className += 'slotMinutes text-muted '
    if (!slot.isInHours) 
        className += 'opacity20 '
    if (slot.isTaken && slot.isSelected) 
        return className + 'slotConflict';
    if (slot.isTaken) 
        return className + 'slotTaken';
    if (slot.isSelected)
        return className + 'slotSelected';
    return className;
}

function updateTimeSlot(min, max,date, timeFrom, timeTo, tableReservations) {
    return slots.map(slot => {
        var isHour = slot % 4 === 0;
        var hour = Math.floor(slot / 4);
        var minutes = slot % 4 * 15;
        var dateTime = new Date(`${date} ${hour}:${minutes}:00`);
        // if (tableReservations.length > 0 && (dateTime > new Date())) debugger;
        return {
            id: slot,
            isHour: isHour,
            display: (isHour ? slot / 4 : slot % 4 * 15),
            isTaken: tableReservations.some(reservation => new Date(reservation.from_time) <= dateTime && new Date(reservation.to_time) > dateTime),
            isSelected: timeFrom && timeFrom <= dateTime && (timeTo > dateTime),
            isInHours: dateTime >= min && dateTime < max,
            dateTime: dateTime
        }
    });
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
