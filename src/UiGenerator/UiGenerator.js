import React from 'react';
import FormItemLayout from '../FormItemLayouts/FormItemLayout';


export default function UiGenerator( data ){

    return (
        <div>
            <h2>UI Generator</h2>
            {
                data.data.length > 0 ? data.data.map((item, index) => {
                    return (
                        <FormItemLayout key={index} data={item} remove={data.remove}/>
                    );
                }) :  <p>No Form Items Yet!</p>
            }
        </div>
    )
}


