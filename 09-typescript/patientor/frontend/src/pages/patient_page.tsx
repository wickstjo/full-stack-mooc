import { useEffect } from "react";
import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Patient } from "../types/patient";

import { useParams } from "react-router-dom";
import { useStateValue } from "../state";

import Details from '../components/details';
import Entries from '../components/entries';
import HospitalPrompt from '../prompts/add_hospital/prompt';
import HealthCarePrompt from '../prompts/add_healthcare/prompt';
import HealthCheckPrompt from '../prompts/add_healthcheck/prompt';

const PatientPage = () => {

    // EXTRACT PARAM FROM URL
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();

    // ATTEMPT TO LOCATE TARGET
    const target = id ? patients[id] : null;

    // LOAD TARGET FROM DB WHEN NECESSARY
    useEffect(() => {
        if(id && !target) {
            const query = async () => {
                const { data: patient_data } = await axios.get<Patient>(`${ apiBaseUrl }/patients/${ id }`);
                
                dispatch({
                    type: "ADD_PATIENT",
                    payload: patient_data
                });
            };
    
            void query();
        }
    }, []);

    // USER NOT FOUND
    if (!target || !id) { return (
        <div>Not found</div>
    );} 

    // OTHERWISE, RENDER NORMALLY
    return (
        <div>
            <Details target={ target } />
            <Entries target={ target } />
            <HospitalPrompt patient_id={ id } />
            <br />
            <HealthCarePrompt patient_id={ id } />
            <br />
            <HealthCheckPrompt patient_id={ id } />
        </div>
    );
};

export default PatientPage;