import React from 'react';
import './JsonGenerator.css';
import UiGenerator from '../UiGenerator/UiGenerator'

const initialFormData = {
    formItemType: "",
    name: "",
    label: "",
    itemId: 0,
    required: ""
}

class PayloadGeneratorC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: initialFormData,
            entireFormArray: [],
            btnGroupArray: [],
            btnItem: "",
            inputType: "text"
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState( prevState => ({
            formData: {
                ...prevState.formData,
                [e.target.name]: e.target.value, // set the key as name of HTML element and the value as of the HTML element
                itemId: Math.random() // give form item unique ID
            }
        }))
    }

    cleanup = () => {
        // clear the form data state 
        this.setState({
            formData: initialFormData,
            btnGroupArray: [],
            btnItem: ""
        })
        document.getElementsByName("label")[0].value = "";
        document.getElementsByName("formItemType")[0].value = "";
        document.getElementsByName("required")[0].value = "";
      }


    handleButtonChange = (e) => {
        e.preventDefault();
        this.setState({ btnItem: e.target.value })
    }
    handleButtonClick = (e) => {
        e.preventDefault();
        let newArr = [...this.state.btnGroupArray, this.state.btnItem] // make new arr
        let newFormOBJ = {...this.state.formData} // make copy of form obj
        newFormOBJ.items = [...newArr] // add items field to form obj and populate it

        this.setState({
            formData: newFormOBJ,
            btnGroupArray: newArr,
            btnItem: ""
        })
    }

    removeButtonFromGroup = (e, index) => {
        e.preventDefault(); 
        let newArr = [...this.state.btnGroupArray]; // make a copy of the state array
        if (index > -1) {
            newArr.splice(index, 1); // remove the desired buttion from array
        }
        this.setState({ btnGroupArray: newArr }) // upddate state array
    }

    loginValidation = () => {
        // if the title, selection, or required is "" then cannot continue
        if (this.state.formData.label === "" || this.state.formData.formItemType === "" || this.state.formData.required === ""){
            return false
        } else {
            return true
        }

    }





    removeFromForm = (id) => {
         var newEntireFormArray = [...this.state.entireFormArray]; //create a new array so we dont modify state directly
         newEntireFormArray = newEntireFormArray.filter(x => x.itemId !== id); // filter array so we dont have the deleted item
         this.setState({
            entireFormArray: newEntireFormArray
         })
    } 
    addToForm = (e) => {
        e.preventDefault();
        const validation = this.loginValidation();
        if (validation) {
            var newEntireFormArray = [...this.state.entireFormArray, this.state.formData] // add form data to end of payload
            this.setState({ entireFormArray: newEntireFormArray })
            this.cleanup(); // clear formdata and inputs
        } else {
            alert("Please fill in all fields (Section Heading, Section Type, and the required section)")
        }

    };
    resetForm = (e) => {
        e.preventDefault();
        this.setState({
            entireFormArray: []
        })      
    }
    submitForm = (e) => {
        e.preventDefault();
        if (this.state.entireFormArray.length > 0) {
            this.props.addPayloadFunction(this.state.entireFormArray);
        }
        else {
            alert("Please add an item to the form before submitting")
        }
        
    }



      render() {
          return (
              <div className="main">
                  <div className="PayloadSection">
                        <label>
                            <h3>Section Heading</h3>
                                <input 
                                name="label" 
                                type="text" 
                                value={this.state.formData.label} 
                                onChange={this.handleChange} 
                                placeholder="Enter Heading Here" 
                                className="payloadGenUI"
                                />
                        </label>
                        <br />
                        <label>
                            <h3>Section Type</h3>
                            <select name="formItemType" onChange={this.handleChange} value={this.state.formData.formItemType} >
                                <option value="">N/A</option>
                                <option value="lgText">Large Text Box</option>
                                <option value="text">Small Text Box (AlphaNumerical)</option>
                                <option value="number">Small Text Box (Numerical)</option>
                                <option value="radioBtnGroup">Radio Button Group</option>
                                <option value="checkboxGroup">Checkbox Group</option>
                                <option value="date">Date Selection</option>
                                <option value="photo">Photo / File Selection</option>
                                <option value="map">Map Display</option>
                            </select>
                        </label>

                        {
                            (this.state.formData.formItemType === "radioBtnGroup" || this.state.formData.formItemType === "checkboxGroup") &&
                                <div className="btnGroupSection">
                                    <h4>What items would you like to add?</h4>
                                    <input id="item" type="text" name="btnGroupInput" value={this.state.btnItem} onChange={this.handleButtonChange} />
                                    <button onClick={this.handleButtonClick}> click </button>

                                    {
                                        this.state.btnGroupArray.length > 0 || this.state.btnGroupArray !== undefined ? (
                                            this.state.btnGroupArray.map((ele, index) => {
                                                return (
                                                    <div style={{display: "flex"}} key={Math.random()}>
                                                        <p style={{margin: 8}}> {ele} </p>
                                                        <button onClick={(event) => this.removeButtonFromGroup(event, index)}> x </button>
                                                    </div>
                                                );
                                            })
                                        ) :  <p>No items yet</p>
                                    }
                                </div>
                        }

                        <div>
                            <label>
                                <h3>Make this section required?</h3>
                                <select name="required" onChange={this.handleChange} value={this.state.formData.required} >
                                    <option value="">N/A</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </label>
                        </div>

                        <button onClick={this.addToForm} style={{marginLeft: 0}} className="payloadBtn">Add to Form</button>
                        <button onClick={this.resetForm} className="payloadBtn">Clear Form</button>
                        <button onClick={this.submitForm} className="payloadBtn">Finish Form</button>

                  </div>
                  
                  <div className="UiSection">
                      <UiGenerator 
                        data={this.state.entireFormArray} 
                        remove={this.removeFromForm} 
                        formTitle={this.props.formTitle}
                        author={this.props.author}
                        company={this.props.company}
                    />
                </div>
              </div>
          )
      }

}

export default PayloadGeneratorC;