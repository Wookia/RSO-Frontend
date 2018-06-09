import React from 'react';

export function MenuItems(props) {
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
                                {
                                    typeof props.actionFunction === 'function' ?
                                    <span style={{cursor: 'pointer'}} 
                                        onClick={() => props.actionFunction(item, index)} 
                                        className='badge badge-pill badge-primary'>
                                            Add
                                    </span>
                                    : null
                                }
                            </div>
                        );
                    }
                )}
            </div>
        )
}