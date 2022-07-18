import { parse_gender, parse_string, parse_date } from './utils';

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
}

export type ScrubbedPatient = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

type Fields = {
    name: unknown,
    dateOfBirth: unknown,
    ssn: unknown,
    gender: unknown
    occupation: unknown
};

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {
    const newEntry: NewPatient = {
        name: parse_string(name),
        dateOfBirth: parse_date(dateOfBirth),
        ssn: parse_string(ssn),
        gender: parse_gender(gender),
        occupation: parse_string(occupation),
    };
  
    return newEntry;
};