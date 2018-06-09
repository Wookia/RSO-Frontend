import React from 'react';
const legendStyle = {float: 'left', margin: '0.25em', width: '1em', height: '1em'};

export function Tables(props) {
    const { data, isLoading, error } = props.tables;

    if (error) {
        return <span className="text-danger">{error.message}</span>
    }

    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <div className="form-group slideIn">
            <h4>Tables</h4>
            <div>
                {data.map((table) => {
                    var color = (!table.is_taken ? 'bg-success' : 'bg-danger');
                    return <div key={table.id_table}
                                className={`table-restaurant ${color}`}>
                                <span>Table {table.id_table}</span><br/>
                                <span style={{fontSize: 'smaller'}}>{table.seats} seats</span>
                            </div>;
                })}
            </div>
            Represents current state of the tables
            <div><div className={'bg-success'} style={legendStyle}></div> - Free</div>
            <div><div className={'bg-danger'} style={legendStyle}></div> - Taken</div>
        </div>
    )
}
