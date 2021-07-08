import React from 'react';
import './FormItemLayout.css';

export default function FormItemLayout( data ){
    const {label, formItemType, itemId, required} = data.data // destructure object into variables

    const removeItem = id => e => {
        e.preventDefault();
        data.remove(id.itemId)
    }


    return (
        <div className="ItemLayout">
            <h3>{label}</h3>
            <p>Type: {formItemType}</p>
            <p>Required: {required}</p>


            <button onClick={removeItem({itemId})}>Remove Item</button>
        </div>
    );

}