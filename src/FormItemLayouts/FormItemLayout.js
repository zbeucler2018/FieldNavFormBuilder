import React from 'react';
import './FormItemLayout.css';

export default function FormItemLayout( data ){
    const {label, formItemType, itemId, required} = data.data // destructure prop object into variables

    const removeItem = id => e => {
        e.preventDefault(); // stop page from reloading when button is pressed
        data.remove(id.itemId) // use function from payloadGen.js to remove this current item
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