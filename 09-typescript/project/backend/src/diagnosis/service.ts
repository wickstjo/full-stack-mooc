import data from './data';
import { Diagnosis } from '../types/diagnosis';

const getEntries = (): Array<Diagnosis> => {
    return data;
};

const findById = (code: string): Diagnosis | undefined => {
    return data.find(entry => entry.code === code);
};

const addDiagnosis = (input: Diagnosis) => {
    
    // CREATE NEW ENTRY WITH ID
    const entry = {
        ...input,
        id: data.length,
    };

    // PUSH & RETURN
    data.push(entry);
    return entry;
};

export default {
    getEntries,
    findById,
    addDiagnosis,
};