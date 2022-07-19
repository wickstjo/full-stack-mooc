import { v1 as uuid } from 'uuid';
import data from './data';
import { Patient, NewPatient, parse_patient, ScrubbedPatient } from '../types/patient';
import { NewHospital, NewOccupationalHealthcare, NewHealthCheck  } from '../types/entry';

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

const add_healthcare = (input: NewOccupationalHealthcare, target: number) => {


    // CREATE NEW ENTRY WITH ID
    const entry = {
        ...input,
        id: uuid(),
    };

    // PUSH & RETURN
    data[target].entries.push(entry);
    return entry;
}

const add_hospital = (input: NewHospital, target: number) => {
    console.log(input);

    // CREATE NEW ENTRY WITH ID
    const entry = {
        ...input,
        id: uuid(),
    };

    // PUSH & RETURN
    data[target].entries.push(entry);
    return entry;
}

const add_healthcheck = (input: NewHealthCheck, target: number) => {
    console.log(input);

    // CREATE NEW ENTRY WITH ID
    const entry = {
        ...input,
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