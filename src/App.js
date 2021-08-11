// React
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// components
import MetaDataGenerator from './JsonGenerator/MetaDataGenerator';
import FormSelectionScreen from './FormSelectScreen/FormSelection';
//import FieldNavNavbar from './Navbar/Navbar';
import PayloadGenerator from './JsonGenerator/PayloadGeneratorClass';

// MISC
import clone from 'just-clone';
import firebase from 'firebase';
import firestore from './Firebase/firestoreinit'; // DO NOT UNCOMMENT THIS LINE, THE DB WILL NOT BE INITIALIZED


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
  updateCreatedDate = (value) => {
    let updated = clone(this.state.formMetaData)
    updated.CreatedDate = value
    this.setState({ formMetaData: updated })
  }
  updateCreatedTime = (value) => {
    let updated = clone(this.state.formMetaData)
    updated.CreatedTime = value
    this.setState({ formMetaData: updated })
  }
  updateFormID = (value) => {
    let updated = clone(this.state.formMetaData)
    updated.FormId = value
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
    this._restartForm();
  }
  /*******************/


  restartForm = () => {
    this.setState({
        formMetaData: initialFormData, // reset form data
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
                  updateCreatedDate={this.updateCreatedDate}
                  updateCreatedTime={this.updateCreatedTime}
                  updateCreatedBy={this.updateCreatedBy}
                  updateFormID={this.updateFormID}
                  formMetaData={this.state.formMetaData}
                />
              </Route>

              <Route exact path="/Selection">
                <FormSelectionScreen />
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



/*
import MetaDataGenerator from './JsonGenerator/MetaDataGenerator';
import FormSelectionScreen from './FormSelectScreen/FormSelection';
import PayloadGenerator from './JsonGenerator/PayloadGeneratorClass';
import FieldNavNavbar from './Navbar/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div>
     <div>
     <Router>
         <Switch>
           <Route exact path="/">
             <MetaDataGenerator />
           </Route>
           <Route exact path="/Selection">
             <FormSelectionScreen />
           </Route>
           <Route exact path="/Newform">
             <PayloadGenerator />
           </Route>
         </Switch>
     </Router>
     </div>

   </div>
 );
}

export default App;
*/
