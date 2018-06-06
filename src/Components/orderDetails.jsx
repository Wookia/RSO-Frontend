import React from 'react';
import '../App.css'
import '../tools/helperFunctions'

export function OrderDetails (props) {
    var orderItems = [];
    for (var i = 0; i < props.order.dishes.length; i++) {
        var dish = props.order.dishes[i];
        // eslint-disable-next-line
        var menuItem = props.menuItems.find(item => item.id === dish);
        orderItems.push(menuItem);
    }
    var totalPrice = orderItems.reduce((acc, val) => acc + val.price, 0);

    return (
        <div>
            <h3>Order {props.order.id}</h3>
            <div>Waiter: <strong>{props.order.waiter}</strong></div>
            <div>Table {props.order.table}</div>
            <div>State: <strong>{props.order.state}</strong></div><br/>
            <Summary count={orderItems.length} price={totalPrice} />
            <OrderItems items={orderItems} />
            <hr />
            <button className="btn btn-default" style={{float: 'right'}} onClick={props.returnFunction}>Return</button>
        </div>
    );

}

function Summary(props) {
    if (props.count === 0)
        return (null);
    else
        return (
        <div className='form-group'>
            <h4>Summary:</h4>
            <div>Total dishes: <strong>{props.count}</strong></div>
            <div>Total price: <strong>{props.price} zł</strong></div>
        </div>);
}

function OrderItems(props) {
    if (!props.items) 
        return <div className='form-group'>No items</div>;
    else
        return (
            <div className='form-group'>
                {props.items.map((item, index) =>
                    {
                        return (
                            <div key={index} className='menu-items'>
                                {item.name}<br/>
                                Price: {item.price} zł<br/>
                                <span className='text-muted'>{item.description}</span><br/>
                            </div>
                        );
                    }
                )}
            </div>
        )
}