import React, { useState, useEffect } from 'react';
import './JsonGenerator.css';
import PayloadGenerator from './PayloadGenerator';
import firebase from 'firebase';
import firestore from '../Firebase/firestoreinit';


const initialFormData = {
    FormId: 0,
    Company: "",
    CreatedBy: "",
    CreatedWhen: "",
    LastModified: "",
    LastModifiedBy: "",
    Payload: []
}

export default function MetaDataGenerator() {
    const [formMetaData, setFormMetaData] = useState(initialFormData);
    const [metaDataFinished, setMetaDataFinished] = useState(false);

    useEffect(() => { // wait for the payload to contain items, then send to DB
        if (formMetaData.Payload.length !== 0) {sendToDB()}
    })

    const handleChange = (e) => {
        setFormMetaData({
            ...formMetaData,
            [e.target.name]: e.target.value,
            CreatedWhen: Date().slice(16,57), // get current system date and timezone
            FormId: Math.random() // get random ID

        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        document.getElementsByName("CreatedBy")[0].value = ""; // clear inputs
        document.getElementsByName("Company")[0].value = "";
        setMetaDataFinished(true);
    }

    const sendToDB = () => {
        const db = firebase.firestore(); // init the db
        const formRef = db.collection("Forms").add({ // add formMetaData to the "Forms" collection in firebase
            formMetaData
        });

        restartForm(); // clear the state form
    }

    const restartForm = () => {
        setMetaDataFinished(false); // Go back to beginning screen
        setFormMetaData(initialFormData); // clear the form data
    }

    const addPayload = (payload) => {
        // add payload to meta data
        setFormMetaData( (data) => {
            return {
                ...data, 
                Payload: [...payload]
            }
        });
        alert("Form Submitted!");
    }




    return (
        <>
        <div>
            { !metaDataFinished &&
                <>
                    <p>Enter your name here:</p>
                    <input name="CreatedBy" onChange={handleChange} value={formMetaData.CreatedBy} />
                    <p>Enter Your Company here:</p>
                    <input name="Company" onChange={handleChange} value={formMetaData.Company} />

                    <button onClick={handleSubmit}>Next</button>
                </>
            }

            { metaDataFinished &&
                <>
                    <div>
                        <span style={{paddingLeft: "20px", float:"left"}}>Created By: {formMetaData.CreatedBy} at {formMetaData.Company}</span>
                        <span style={{paddingLeft: "20px", float:"right"}}>Date: {formMetaData.CreatedWhen}</span>
                    </div>

                    <PayloadGenerator addPayloadFunction={addPayload} sendToDB={sendToDB}/>
                </>

            }
            <br /><br />
            <div style={{paddingTop:"50vh", display:"none"}}>
                <pre>{JSON.stringify(formMetaData, null, 4)}</pre> 
            </div>

            
        </div>

        </>
    )
}
