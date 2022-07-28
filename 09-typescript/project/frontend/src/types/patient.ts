import { Entry } from './entry';

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn: string;
    dateOfBirth: string;
    entries: Entry[];
}

export type Profile = Omit<Patient, 'id' | 'dateOfBirth'>;

export type ScrubbedPatient = Omit<Patient, 'ssn'>;

export const is_string = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const is_gender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

export const parse_gender = (param: unknown): Gender => {
    if (!param || !is_gender(param)) {
        throw new Error(`gender property incorrect or missing. Expecting one of [${ Object.values(Gender).join(', ') }].`);
    }

    return param;
};