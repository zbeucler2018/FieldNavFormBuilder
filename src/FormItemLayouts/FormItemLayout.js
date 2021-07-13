import React from 'react';
import './FormItemLayout.css';

export default function FormItemLayout( data ){
    const {label, formItemType, itemId, required} = data.data // destructure prop object into variables

    const removeItem = id => e => {
        e.preventDefault(); // stop page from reloading when button is pressed
        data.remove(id.itemId) // use function from payloadGen.js to remove this current item
    }

    switch(formItemType){
        case "lgText": 
            return (
                <div className="ItemLayout lgText">
                    <h3>{label}</h3>
                    <textarea />
                    <p>Type: Large Text Box</p>
                    <p>Required: {required}</p>
        
                    <button onClick={removeItem({itemId})}>Remove Item</button>
                </div>
            );
        case "text": 
        return (
            <div className="ItemLayout text">
                <h3>{label}</h3>
                <input type="text" />
                <p>Type: Small Text Box</p>
                <p>Required: {required}</p>
    
                <button onClick={removeItem({itemId})}>Remove Item</button>
            </div>
        );
        case "dropDownSingle":
            // make 'items' into a list
            // const items = data.data.items
            return (
                <div className="ItemLayout dropDownSingle">
                    <h3>{label}</h3>
                    <h3>DropDownSingle</h3>
                    <p>Type: Drop down (Single Select)</p>
                    <p>Required: {required}</p>
    
                    <button onClick={removeItem({itemId})}>Remove Item</button>
                </div>
            );
        case "date":
            return (
                <div className="ItemLayout date">
                    <h3>{label}</h3>
                    <input type="date" />
                    <p>Type: Date Selection</p>
                    <p>Required: {required}</p>
    
                    <button onClick={removeItem({itemId})}>Remove Item</button>
                </div>
            );

        case "photo":
            return (
                <div className="ItemLayout map">
                    <h3>{label}</h3>
                    <input type="file" />
                    <p>Type: {formItemType}</p>
                    <p>Required: {required}</p>

                    <button onClick={removeItem({itemId})}>Remove Item</button>
                </div>
            );
        case "map":
            return (
                <div className="ItemLayout map">
                    <h3>{label}</h3>
                    <h3>Map element here (use JS SDK)</h3>
                    <p>Type: {formItemType}</p>
                    <p>Required: {required}</p>
    
                    <button onClick={removeItem({itemId})}>Remove Item</button>
                </div>
            );
            
        default:
            return (
                <div className="ItemLayout default">
                    <h3>{label}</h3>
                    <h3>UnKnown item selected</h3>
                    <p>Type: {formItemType}</p>
                    <p>Required: {required}</p>
    
                    <button onClick={removeItem({itemId})}>Remove Item</button>
                </div>
            );


    }





}