import { Entry } from './entry';
import { parse_gender, parse_string, parse_date } from '../utils';

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type ScrubbedPatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id' | 'entries'>;

type Fields = {
    name: unknown,
    dateOfBirth: unknown,
    ssn: unknown,
    gender: unknown
    occupation: unknown
};

export const parse_patient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {
    const newEntry: NewPatient = {
        name: parse_string(name, 'name'),
        dateOfBirth: parse_date(dateOfBirth),
        ssn: parse_string(ssn, 'ssn'),
        gender: parse_gender(gender),
        occupation: parse_string(occupation, 'occupation'),
    };
  
    return newEntry;
};