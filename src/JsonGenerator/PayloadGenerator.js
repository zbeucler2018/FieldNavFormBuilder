import React, { useState, useEffect } from 'react';
import './JsonGenerator.css';
import UiGenerator from '../UiGenerator/UiGenerator'


const initialFormData = {
    formItemType: "",
    name: "",
    label: "",
    itemId: 0,
    required: ""
}

export default function PayloadGenerator( data ) {
    const [formData, updateFormData] = useState(initialFormData); // 
    const [entireFormArray, updateEntireFormArray] = useState([]); // this becomes the payload array

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value, // set the key as name of HTML element and the value as of the HTML element
            itemId: Math.random() // give form item unique ID
        });
    };

    const cleanup = () => {
      // clear the form data state 
      updateFormData(initialFormData); // reset the state
      document.getElementsByName("label")[0].value = "";
      document.getElementsByName("formItemType")[0].value = "";
      document.getElementsByName("required")[0].value = "";
    }

    const removeFromForm = (id) => {
      var newEntireFormArray = [...entireFormArray]; //create a new array so we dont modify state directly
      newEntireFormArray = newEntireFormArray.filter(x => x.itemId !== id); // filter array so we dont have the deleted item
      updateEntireFormArray(newEntireFormArray); // update state
    }
  
    const addToForm = (e) => {
      e.preventDefault();
      updateEntireFormArray(entireFormArray => [...entireFormArray, formData]); // append new form item to entireFormArray with updateEntireFormArray
      cleanup(); // clear formdata and inputs
    };

    const resetForm = (e) => {
      e.preventDefault();
      updateEntireFormArray([]); // update the state to an empty array
    }



    const submitForm = (e) => {
      e.preventDefault();
      data.addPayloadFunction(entireFormArray); // adds payload to metadata JSON field
    }

  
    return (
      <div className="main">
        <div className="PayloadSection">
          <label>
            <p>Section Heading</p>
            <input name="label" type="text" value={formData.label} onChange={handleChange} />
          </label>
          <br />
          <label>
            <p>Section Type</p>
            <select name="formItemType" onChange={handleChange} value={formData.formItemType} >
                <option value="">N/A</option>
                <option value="lgText">Large Text Box</option>
                <option value="text">Small Text Box</option>
                <option value="dropDownSingle">Dropdown Single Select</option>
                <option value="date">Date Selection</option>
                <option value="photo">Photo / File Selection</option>
                <option value="map">Map Display</option>
            </select>
          </label>

          <label>
              <p>Make this section required?</p>
              <select name="required" onChange={handleChange} value={formData.required} >
                  <option value="">N/A</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
              </select>
          </label>

          <br />

          {
              formData.formItemType === "dropDownSingle" &&
              <>
                  <label>
                      What items would you like to add to the drop down? (please seperate them with a '<b>:</b>') <br />
                      <textarea name="items" value={formData.items} onChange={handleChange} />
                  </label>
              </>
          }

          <br />
          <button onClick={addToForm}>Add to Form</button>
          <button onClick={resetForm}>Clear Form</button>
          <button onClick={submitForm}>Finish Form</button>
          <br />
          <hr />        
        </div>
        
        <div className="UiSection">
          <UiGenerator data={entireFormArray} remove={removeFromForm}/>
        </div>

      </div>

    );
  };

