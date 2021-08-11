import React from 'react';
// Libraries
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
// MISC
import './loginPage.css';




export default class MetaDataGenerator extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            metaDataFinished: false
        }
    }

    handleChange = e => {
        if (e.target.name === "CreatedBy") { this.props.updateCreatedBy(e.target.value) }
        else if (e.target.name === "Company") { this.props.updateCompany(e.target.value) }
        else if (e.target.name === "FormTitle") { this.props.updateFormTitle(e.target.value) }
    }

    handleSubmit = async e => {
        e.preventDefault();
        const formDate = await new Date().toISOString().split("T")[0].replaceAll("-", "/") // get current system date
        this.props.updateCreatedDate(formDate)
        const formTime = await Date().slice(16,57)
        this.props.updateCreatedTime(formTime)
        const formId = Math.random() // get random ID
        this.props.updateFormID(formId)
    }

    

    render() {
        return (
            <div className="container">
                <h1>FieldNav Form Builder</h1>
                <div className="logins">
                    <input 
                        name="CreatedBy" 
                        onChange={this.handleChange} 
                        placeholder="Enter your name here" 
                        value={this.props.formMetaData.CreatedBy} 
                        className="field" 
                    />
                    <input 
                        name="Company" 
                        onChange={this.handleChange} 
                        placeholder="Enter Your Company here" 
                        value={this.props.formMetaData.Company} 
                        className="field" 
                    />
                    <input 
                        name="FormTitle" 
                        onChange={this.handleChange} 
                        placeholder="Enter the title of the form here" 
                        value={this.props.formMetaData.FormTitle} 
                        className="field" 
                    />              
                </div>
                <Button onClick={this.handleSubmit} color="secondary" >
                    <Link className="link" to={{
                        pathname: "/Selection",
                    }}>Login</Link>
                </Button>
                
            </div>
        )
    }
}