import React from 'react';
import FormItemLayout from '../FormItemLayouts/FormItemLayout';


export default function UiGenerator( data ){

    return (
        <div>
            <h4>Created By: {data.author} at {data.company}</h4>
            <h3>{data.formTitle}</h3>
            {
                // get the payload array from the data prop object and iterate over the array
                data.data.length > 0 ? data.data.map((item, index) => { 
                    return (
                        <FormItemLayout key={index} data={item} remove={data.remove} />
                    );
                }) :  <p>No Form Items Yet!</p> // display this if no items are in payload
            }
        </div>
    )
}


