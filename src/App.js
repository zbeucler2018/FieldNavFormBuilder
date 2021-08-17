// React
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// components
import MetaDataGenerator from './JsonGenerator/MetaDataGenerator';
import FormSelectionScreen from './FormSelectScreen/FormSelection';
//import FieldNavNavbar from './Navbar/Navbar';
import PayloadGenerator from './JsonGenerator/PayloadGeneratorClass';

// MISC
import clone from 'just-clone';
import firebase from 'firebase/app';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
import firestore from './Firebase/firestoreinit'; // DO NOT UNCOMMENT THIS LINE, THE DB WILL NOT BE INITIALIZED
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


const initialFormData = {  
  FormId: 0,
  FormTitle: "",
  Company: "",
  CreatedBy: "",
  CreationDate: "",
  CreationTime: "",
  LastModified: "",
  LastModifiedBy: "",
  Payload: []       // the payload array will contain all the form elements (text field, date picker, etc.)
}

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      formMetaData: initialFormData
    }
  }
  

  /* update metadata */
  updateFormTitle = (value) => {
    let updated = clone(this.state.formMetaData)
    updated.FormTitle = value
    this.setState({ formMetaData: updated })
  }
  updateCompany = (value) => {
    let updated = clone(this.state.formMetaData)
    updated.Company = value
    this.setState({ formMetaData: updated })
  }
  updateCreatedBy = (value) => {
    let updated = clone(this.state.formMetaData)
    updated.CreatedBy = value
    this.setState({ formMetaData: updated })
  }
  updateMetaData = (values) => { // date, time, id
    let updated = clone(this.state.formMetaData)
    updated.CreationDate = values[0]
    updated.CreationTime = values[1]
    updated.FormId = values[2]
    this.setState({ formMetaData: updated })
  }
  /*******************/

  /* updated payload */
  updatePayload = (value) => {
    let updated = clone(this.state.formMetaData)
    updated.Payload = value

    const formMetaData = clone(updated)
    const db = firebase.firestore(); // init DB
    const formRef = db.collection("Forms").add({
      formMetaData
    })
    this.restartForm();
  }
  /*******************/

  restartForm = () => {
    this.setState({
        formMetaData: initialFormData, // clear form data
    })
  }


  render(){
    return (
      <div>
        <div>
        <Router>
            <Switch>
              <Route exact path="/">
                <MetaDataGenerator 
                  updateFormTitle={this.updateFormTitle}
                  updateCompany={this.updateCompany}
                  updateCreatedBy={this.updateCreatedBy}
                  formMetaData={this.state.formMetaData}
                  updateMetaData={this.updateMetaData}
                />
              </Route>

              <Route exact path="/Selection">
                <FormSelectionScreen 
                  formTitle={this.state.formMetaData.formTitle}
                  updateFormTitle={this.updateFormTitle}
                />
              </Route>

              <Route exact path="/Newform">
                <PayloadGenerator
                  formTitle={this.state.formMetaData.FormTitle}
                  createdBy={this.state.formMetaData.CreatedBy}
                  company={this.state.formMetaData.Company}
                  updatePayload={this.updatePayload}
                />
              </Route>
            </Switch>
        </Router>
        </div>
      </div>
    );
  }
}