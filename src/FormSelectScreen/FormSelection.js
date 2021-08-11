import React from 'react';

import './FormSelectionStyles.css'
import firebase from 'firebase/app';
import firestore from '../Firebase/firestoreinit';
import { Table, Button } from 'reactstrap';
import { Link } from "react-router-dom";



class FormSelectionScreen extends React.Component{
    constructor(props){
        super(props);
        this.firestoreRef = firebase.firestore().collection('Forms');
        this.state = {
            formsArr: [],
            isLoading: true,
        }
    }

    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection); // get forms from DB once comp has loaded
    }
    componentWillUnmount(){
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const formsArr = [];
        querySnapshot.forEach( (res) => {
            const { FormId, FormTitle, Company, CreatedBy, CreationDate, CreationTime, LastModified, LastModifiedBy, Payload } = res.data().formMetaData; // deconstruct the obj
            formsArr.push({
                FormId: FormId,
                FormTitle: FormTitle,
                Company: Company,
                CreatedBy: CreatedBy,
                CreationDate: CreationDate,
                CreationTime: CreationTime,
                LastModified: LastModified,
                LastModifiedBy: LastModifiedBy, 
                Payload: Payload
            });
        });
        this.setState({
            formsArr,
            isLoading: false,
        }); 
    }

    render() {
        if (this.state.isLoading){
            return (
                <div>
                    <h1>Forms are loading</h1>
                </div>
            )
        } else {
            return (
                <div className="main">
                    <h2>Directory</h2>
                    <h2><Link className="link" to="/"><p className="goBackText">Go back to Login</p></Link></h2>
                    <div className="tableWrapper">
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>Form Name</th>
                                    <th>Line of Buisness</th>
                                    <th>Last Modified By</th>
                                    <th>Last Modification Date</th>
                                    <th>Creation Date</th>
                                    <th>Created By</th>
                                </tr>

                            </thead>

                            
                                {this.state.formsArr.length !== 0 ? this.state.formsArr.map( (form) => {
                                    const { FormTitle, LastModified, LastModifiedBy, CreationDate, CreatedBy, FormId} = form
                                    return (
                                        <tbody key={FormId}>
                                            <tr>
                                                <td onClick={event => console.log(event)}>{FormTitle ? FormTitle : "Value not available" }</td>
                                                <td>{form.LineOfBuisness ? form.LineOfBuisness : "Value not available" }</td>
                                                <td>{LastModified ? LastModified : "Value not available" }</td>
                                                <td>{LastModifiedBy ? LastModifiedBy : "Value not available" }</td>
                                                <td>{CreationDate ? CreationDate : "Value not available" }</td>
                                                <td>{CreatedBy ? CreatedBy : "Value not available" }</td> 
                                            </tr>                               
                                        </tbody>
                                    )
                                }) : <p>Error Loading</p>
                            }
                        </Table>

                        <Button color="secondary" >
                            <Link className="link" to={{
                                pathname: "/Newform"
                            }}>Create new form</Link>
                        </Button>

                    </div>
                    
                </div>
            )
        }
    }
}

export default FormSelectionScreen


/*

import React from 'react';

import './FormSelectionStyles.css'
import firebase from 'firebase/app';
import firestore from '../Firebase/firestoreinit';
import { Table, Button } from 'reactstrap';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";

const dummy = {
    FormId: 0,
    FormTitle: "",
    Company: "",
    CreatedBy: "",
    CreationDate: "",
    CreationTime: "",
    LastModified: "",
    LastModifiedBy: "",
    Payload: [
        {
            formItemType: "text",
            name: "",
            label: "test",
            itemId: 0,
            required: "true"
        }
    ]
}



class FormSelectionScreen extends React.Component{
    constructor(props){
        super(props);
        this.firestoreRef = firebase.firestore().collection('Forms');
        this.state = {
            formsArr: [],
            isLoading: true,
        }
    }

    idk = (e) => {
        e.preventDefault();
        this.props.history.location.state.addPayloadFunction(dummy)
        alert("subbed")
    }

    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection); // get forms from DB once comp has loaded
    }
    componentWillUnmount(){
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const formsArr = [];
        querySnapshot.forEach( (res) => {
            const { FormId, FormTitle, Company, CreatedBy, CreationDate, CreationTime, LastModified, LastModifiedBy, Payload } = res.data().formMetaData; // deconstruct the obj
            formsArr.push({
                FormId: FormId,
                FormTitle: FormTitle,
                Company: Company,
                CreatedBy: CreatedBy,
                CreationDate: CreationDate,
                CreationTime: CreationTime,
                LastModified: LastModified,
                LastModifiedBy: LastModifiedBy, 
                Payload: Payload
            });
        });
        this.setState({
            formsArr,
            isLoading: false,
        }); 
    }

    render() {
        if (this.state.isLoading){
            return (
                <div>
                    <h1>Forms are loading</h1>
                </div>
            )
        } else {
            return (
                <div className="main">
                    <h2>Directory</h2>
                    <h2><Link className="link" to="/"><p className="goBackText">Go back to Login</p></Link></h2>
                    <div className="tableWrapper">
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>Form Name</th>
                                    <th>Line of Buisness</th>
                                    <th>Last Modified By</th>
                                    <th>Last Modification Date</th>
                                    <th>Creation Date</th>
                                    <th>Created By</th>
                                </tr>

                            </thead>

                            
                                {this.state.formsArr.length !== 0 ? this.state.formsArr.map( (form) => {
                                    const { FormTitle, LastModified, LastModifiedBy, CreationDate, CreatedBy, FormId} = form
                                    return (
                                        <tbody key={FormId}>
                                            <tr>
                                                <td onClick={event => console.log(event)}>{FormTitle ? FormTitle : "Value not available" }</td>
                                                <td>{form.LineOfBuisness ? form.LineOfBuisness : "Value not available" }</td>
                                                <td>{LastModified ? LastModified : "Value not available" }</td>
                                                <td>{LastModifiedBy ? LastModifiedBy : "Value not available" }</td>
                                                <td>{CreationDate ? CreationDate : "Value not available" }</td>
                                                <td>{CreatedBy ? CreatedBy : "Value not available" }</td> 
                                            </tr>                               
                                        </tbody>
                                    )
                                }) : <p>Error Loading</p>
                            }
                        </Table>

                        <Button color="secondary" >
                            <Link className="link" to={{
                                pathname: "/Newform",
                                state: {
                                    metaData: this.props.location.state.metaData,
                                }
                            }}>Create new form</Link>
                        </Button>
                        <Button color="secondary" onClick={this.idk}>
                            here
                        </Button>
                    </div>
                    
                </div>
            )
        }
    }
}

export default withRouter(FormSelectionScreen)
*/