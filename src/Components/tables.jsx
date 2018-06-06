import React from 'react';

export class Tables extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    render() {
        const { data, isLoading, error } = this.props.tables;

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
                            Waiter
                        </th>
                        <th>
                            Seats
                        </th>
                        <th>
                            Is Taken
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => {
                        return (
                            <tr key={item.id_table}>
                                <td>{item.id_table}</td>
                                <td>{item.waiter}</td>
                                <td>{item.seats}</td>
                                <td>{item.is_taken? 
                                    <span className='text-danger'>Taken</span>:
                                    <span className='text-success'>Free</span>
                                }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        )
    }
}