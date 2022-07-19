import { v1 as uuid } from 'uuid';
import data from './data';
import { Patient, NewPatient, parse_patient, ScrubbedPatient } from '../types/patient';
import { NewHospital, NewHealthCare, NewHealthCheck, parse_health_check, parse_health_care, parse_hospital } from '../types/entry';

const getEntries = (): Patient[] => {
    return data;
};

const getScrubbed = (): ScrubbedPatient[] => {
    return data.map(entry => ({
        id: entry.id,
        name: entry.name,
        dateOfBirth: entry.dateOfBirth,
        gender: entry.gender,
        occupation: entry.occupation,
        entries: entry.entries,
    }));
};

const findById = (id: string): Patient | undefined => {
    return data.find(entry => entry.id === id);
};

const addPatient = (input: NewPatient) => {
    
    // CREATE NEW ENTRY WITH ID
    const entry = {
        ...parse_patient(input),
        id: uuid(),
        entries: []
    };

    // PUSH & RETURN
    data.push(entry);
    return entry;
};

const add_healthcare = ({ description, date, specialist, diagnosisCodes, employerName, sickLeave }: NewHealthCare, target: number) => {

    // CREATE NEW ENTRY WITH ID
    const entry = {
        ...parse_health_care({
            description, date, specialist, diagnosisCodes, employerName, sickLeave
        }),
        id: uuid(),
    };

    // PUSH & RETURN
    data[target].entries.push(entry);
    return entry;
}

const add_hospital = ({ description, date, specialist, diagnosisCodes, discharge }: NewHospital, target: number) => {

    // CREATE NEW ENTRY WITH ID
    const entry = {
        ...parse_hospital({
            description, date, specialist, diagnosisCodes, discharge
        }),
        id: uuid(),
    };

    // PUSH & RETURN
    data[target].entries.push(entry);
    return entry;
}

const add_healthcheck = ({ description, date, specialist, diagnosisCodes, healthCheckRating }: NewHealthCheck, target: number) => {

    // CREATE NEW ENTRY WITH ID
    const entry = {
        ...parse_health_check({
            description, date, specialist, diagnosisCodes, healthCheckRating
        }),
        id: uuid(),
    };

    // PUSH & RETURN
    data[target].entries.push(entry);
    return entry;
}

export default {
    getEntries,
    getScrubbed,
    findById,
    addPatient,
    add_healthcare,
    add_hospital,
    add_healthcheck,
};