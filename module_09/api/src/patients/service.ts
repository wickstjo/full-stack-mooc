import { v1 as uuid } from 'uuid';
import data from './data';
import { Patient, NewPatient, toNewPatient, ScrubbedPatient } from '../other/types';

const getEntries = (): Array<Patient> => {
    return data;
};

const getScrubbed = (): Array<ScrubbedPatient> => {
    return data.map(entry => ({
        id: entry.id,
        name: entry.name,
        dateOfBirth: entry.dateOfBirth,
        gender: entry.gender,
        occupation: entry.occupation,
    }));
};

const findById = (id: string): Patient | undefined => {
    return data.find(entry => entry.id === id);
};

const addPatient = (input: NewPatient) => {
    
    // CREATE NEW ENTRY WITH ID
    const entry = {
        ...toNewPatient(input),
        id: uuid()
    };

    // PUSH & RETURN
    data.push(entry);
    return entry;
};

export default {
    getEntries,
    getScrubbed,
    findById,
    addPatient
};