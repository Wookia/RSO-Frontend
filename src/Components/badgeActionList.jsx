import React from 'react';

export function BadgeActionList(props) {
    var badgeColor = props.badgeColor ? props.badgeColor : 'secondary';

    if (!props.items) 
        return <div className='form-group'>No items</div>;
    else
        return (
            <div className='form-group'>
                {props.items.map((item, index) =>
                    {
                        return (
                            <div key={index} className='badge-list-item'>
                                <span style={{paddingRight: '0.5em'}}>{item.name}</span>
                                <span style={{cursor: 'pointer'}} 
                                    onClick={() => props.actionFunction(item, index)} 
                                    className={`badge badge-pill badge-${badgeColor}`}>
                                        {props.badgeText}
                                </span>
                            </div>
                        );
                    }
                )}
            </div>
        )
}