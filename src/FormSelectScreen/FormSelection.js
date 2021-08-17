import React from 'react';

import './FormSelectionStyles.css'
import firebase from 'firebase/app';
import firestore from '../Firebase/firestoreinit';
import { Table, Button, ModalFooter, ModalBody, Modal, ModalHeader } from 'reactstrap';
import { Link } from "react-router-dom";



class FormSelectionScreen extends React.Component{
    constructor(props){
        super(props);
        this.firestoreRef = firebase.firestore().collection('Forms');
        this.state = {
            formsArr: [],
            formDocumentIDArray: [],
            isLoading: true,
            modalOpen: false
        }
    }

    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection); // get forms from DB once comp has loaded
    }
    componentWillUnmount(){
        this.unsubscribe();
        this.setState({modalOpen: false});
    }

    getCollection = (querySnapshot) => {
        const formsArr = []; // contains all form info
        const formDocumentIDArray = []; // contains all IDs of the documents
        querySnapshot.forEach( (res) => {
            const documentID = res.id // get the ID of the given document in the DB
            formDocumentIDArray.push(documentID); // update the array
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
            formDocumentIDArray: formDocumentIDArray,
            isLoading: false
        }); 
    }

    deleteForm = index => async e => {
        e.preventDefault();
        let formID = this.state.formDocumentIDArray[index] // get the formID
        const res = await this.firestoreRef.doc(formID).delete(); // delete the form from the DB
    }

    modalControl = e => {
        e.preventDefault()
        this.setState({modalOpen: !this.state.modalOpen})
    }
    handleModal = (e) => {
        this.props.updateFormTitle(e.target.value)
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
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            
                                {this.state.formsArr.length !== 0 ? this.state.formsArr.map( (form, index) => {
                                    const { FormTitle, LastModified, LastModifiedBy, CreationDate, CreatedBy, FormId} = form
                                    return (
                                        <tbody key={FormId}>
                                            <tr>
                                                <td>{FormTitle ? FormTitle : "Value not available" }</td>
                                                <td>{form.LineOfBuisness ? form.LineOfBuisness : "Value not available" }</td>
                                                <td>{LastModified ? LastModified : "Value not available" }</td>
                                                <td>{LastModifiedBy ? LastModifiedBy : "Value not available" }</td>
                                                <td>{CreationDate ? CreationDate : "Value not available" }</td>
                                                <td>{CreatedBy ? CreatedBy : "Value not available" }</td> 
                                                <td><button onClick={this.deleteForm(index)}>Delete Form</button></td>
                                            </tr>                               
                                        </tbody>
                                    )
                                }) : <p>Error Loading</p>
                            }
                        </Table>

                        <Button onClick={this.modalControl}>
                            Create New Form
                        </Button>

                        <Modal isOpen={this.state.modalOpen} backdrop="static">
                            <ModalHeader><h4>Create New Form</h4></ModalHeader>
                            <ModalBody>
                                <div>
                                    <h5>Please Enter the name of the form below</h5>
                                    <input 
                                        name="formTitle"
                                        onChange={this.handleModal}
                                        value={this.props.formTitle} 
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <div style={{display: 'block'}}>
                                    <span style={{float: "left"}}>
                                        <Button onClick={this.modalControl} color="secondary">
                                            Exit
                                        </Button>
                                    </span>
                                    <span style={{float:'right'}}>
                                        <Link className="link" to="/Newform">
                                            <Button color="secondary">
                                                Continue
                                            </Button>
                                        </Link>
                                    </span>
                                </div>
                            </ModalFooter>
                        </Modal>

                    </div>
                    
                </div>
            )
        }
    }
}

export default FormSelectionScreen;

/**
 * <Button color="secondary" >
                            <Link className="link" to={{
                                pathname: "/Newform"
                            }}>Create new form</Link>
                        </Button>
 */