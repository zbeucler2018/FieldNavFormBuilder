import React, { useState } from 'react';
import './JsonGenerator.css';
import PayloadGenerator from './PayloadGenerator';


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

    const handleChange = (e) => {
        setFormMetaData({
            ...formMetaData,
            [e.target.name]: e.target.value,
            CreatedWhen: Date().slice(16,57),
            FormId: Math.random()

        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMetaDataFinished(true);
    }

    const addPayload = (payload) => {
        // add payload to meta data
        setFormMetaData( (data) => {
            return {
                ...data, 
                Payload: [...payload]
            }
        })
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

                    <PayloadGenerator addPayloadFunction={addPayload} />
                </>

            }
            <br /><br />
        </div>

        </>
    )
}

/*            <pre>{JSON.stringify(formMetaData, null, 4)}</pre>  */
