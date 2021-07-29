import React, { useState } from 'react';
import './JsonGenerator.css';
import UiGenerator from '../src/UiGenerator/UiGenerator'


const initialFormData = {
    formItemType: "",
    name: "",
    label: "",
    itemId: 0,
    required: ""
}

export default function PayloadGenerator( data ) {
    const [formData, updateFormData] = useState(initialFormData);
    const [entireFormArray, updateEntireFormArray] = useState([]); // this becomes the payload array
    const [itemCollection, setItemCollection] = useState([]); // drop down item selection array
    const [item, setItem] = useState(""); // drop down item state



    const handleChange = (e) => {
      if (e.target.name === "radioBtnItem") {
        setItem(e.target.value)
      } else {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value, // set the key as name of HTML element and the value as of the HTML element
          itemId: Math.random() // give form item unique ID
      });
      }
    };

    const cleanup = () => {
      // clear the form data state 
      updateFormData(initialFormData); // reset the state
      setItem("");
      setItemCollection([]);
      document.getElementsByName("label")[0].value = "";
      document.getElementsByName("formItemType")[0].value = "";
      document.getElementsByName("required")[0].value = "";
    }

    const removeDropDownItem = (e, index) => {
      e.preventDefault();
      const newArr = [...itemCollection]; // copy state array
      if (index > -1) {
        newArr.splice(index, 1); // remove item by index
      }
      setItemCollection(newArr); // update state array
    };

    const handleItemClick = (e) => {
      e.preventDefault();
      console.log(`old state array: ${JSON.stringify(itemCollection)}`)
      // add item to itemCollection
      let newArr = [...itemCollection, item]
      console.log(`array to replace old state array: ${newArr}`)
      setItemCollection(newArr);
      console.log(`new state array: ${JSON.stringify(itemCollection)}`)
      
      // clear input
      setItem("");
      // create new obj
      let newFormOBJ = {...formData}
      newFormOBJ.items = [...newArr] // add items field to new obj
      //console.log(JSON.stringify(newFormOBJ.items));
      //console.log(`old form: ${JSON.stringify(formData)}`);
      updateFormData(newFormOBJ);
      console.log(`new form: ${JSON.stringify(formData)}`);
    };

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
            <h3>Section Heading</h3>
            <input 
              name="label" 
              type="text" 
              value={formData.label} 
              onChange={handleChange} 
              placeholder="Enter Heading Here" 
              className="payloadGenUI"
            />
          </label>
          <br />
          <label>
            <h3>Section Type</h3>
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

          {
              formData.formItemType === "dropDownSingle" &&
              <div className="dropDownSection">
                      <h4>What items would you like to add to the drop down?</h4>
                      <input id="item" type="text" name="radioBtnItem" value={item} onChange={handleChange} />
                      <button onClick={handleItemClick}> click </button>

                      {
                        itemCollection.length > 0 || itemCollection !== undefined ? (
                          itemCollection.map((ele, index) => {
                            return (
                              <div style={{display: "flex"}} key={Math.random()}>
                                <p style={{margin: 8}}> {ele} </p>
                                <button onClick={(event) => removeDropDownItem(event, index)}> x </button>
                              </div>
                            );
                          })
                        ) : (
                          <p>No items yet</p>
                        )
                      }
              </div>
          }

          <label>
              <h3>Make this section required?</h3>
              <select name="required" onChange={handleChange} value={formData.required} >
                  <option value="">N/A</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
              </select>
          </label>

          <br />


          
          <button onClick={addToForm} style={{marginLeft: 0}} className="payloadBtn">Add to Form</button>
          <button onClick={resetForm} className="payloadBtn">Clear Form</button>
          <button onClick={submitForm} className="payloadBtn">Finish Form</button>
        </div>
        
        <div className="UiSection">
          <UiGenerator 
            data={entireFormArray} 
            remove={removeFromForm} 
            formTitle={data.formTitle}
            author={data.author}
            company={data.company}
          />
        </div>

      </div>

    );
  };


