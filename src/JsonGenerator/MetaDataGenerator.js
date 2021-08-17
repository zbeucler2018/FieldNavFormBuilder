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
            metaDataFinished: false,
        }
    }

    componentWillUnmount(){
        const formDate = new Date().toISOString().split("T")[0].replaceAll("-", "/") // get current system date
        const formTime = new Date().toString().slice(16,57)
        const formId = Math.random() // get random ID
        const valuesArr = [formDate, formTime, formId]
        this.props.updateMetaData(valuesArr)
    }

    handleChange = e => {
        if (e.target.name === "CreatedBy") { this.props.updateCreatedBy(e.target.value) }
        else if (e.target.name === "Company") { this.props.updateCompany(e.target.value) }
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
                </div>
                <Link className="link" to="/Selection">
                    <Button color="secondary">
                        Login
                    </Button>
                </Link>
            </div>
        )
    }
}