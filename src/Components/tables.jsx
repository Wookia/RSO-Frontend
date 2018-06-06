import React from 'react';

export function Tables(props) {
    const { data, isLoading, error } = props.tables;

    if (error) {
        return <span className="text-danger">{error.message}</span>
    }

    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <div className="form-group">
            <h4>Tables</h4>
            <div>
                {data.map((table) => {
                    var color = (!table.is_taken ? 'bg-success' : 'bg-danger');
                    return <div key={table.id_table}
                                className={`table-restaurant slideIn ${color}`}>
                                <span>Table {table.id_table}</span><br/>
                                <span style={{fontSize: 'smaller'}}>{table.seats} seats</span>
                            </div>;
                })}
            </div>
        </div>
    )
}
