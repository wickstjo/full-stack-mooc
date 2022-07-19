import { Diagnosis } from './diagnosis';

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheck extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthRating;
}

export interface Discharge {
    date: string;
    criteria: string;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}


export interface Hospital extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export interface OccupationalHealthcare extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

export type Entry = | Hospital | OccupationalHealthcare | HealthCheck;

export type NewHealthCheck = Omit<HealthCheck, 'id'>;
export type NewHealthCare = Omit<OccupationalHealthcare, 'id'>;
export type NewHospital = Omit<Hospital, 'id'>;

import { parse_string, parse_date, parse_array, parse_rating, parse_sickleave, parse_discharge } from '../utils/parsers';

//////////////////////////////////////////////////////// HOSPITAL

type HospitalProps = {
    description: unknown,
    date: unknown,
    specialist: unknown,
    diagnosisCodes: unknown,
    discharge: unknown,
};

export const parse_hospital = ({ description, date, specialist, diagnosisCodes, discharge }: HospitalProps): NewHospital => {
    const newEntry: NewHospital = {
        type: 'Hospital',
        description: parse_string(description, 'description'),
        date: parse_date(date),
        specialist: parse_string(specialist, 'specialist'),
        diagnosisCodes: parse_array(diagnosisCodes, 'diagnosisCodes'),
        discharge: parse_discharge(discharge)
    };
  
    return newEntry;
};

//////////////////////////////////////////////////////// HEALTH CHECK

type HealthCheckProps = {
    description: unknown,
    date: unknown,
    specialist: unknown,
    diagnosisCodes: unknown,
    healthCheckRating: unknown
};

export const parse_health_care = ({ description, date, specialist, diagnosisCodes, employerName, sickLeave }: HealthCareProps): NewHealthCare => {
    const newEntry: NewHealthCare = {
        type: 'OccupationalHealthcare',
        description: parse_string(description, 'description'),
        date: parse_date(date),
        specialist: parse_string(specialist, 'specialist'),
        diagnosisCodes: parse_array(diagnosisCodes, 'diagnosisCodes'),
        employerName: parse_string(employerName, 'employerName'),
        sickLeave: parse_sickleave(sickLeave)
    };
  
    return newEntry;
};

//////////////////////////////////////////////////////// HEALTH CARE

type HealthCareProps = {
    description: unknown,
    date: unknown,
    specialist: unknown,
    diagnosisCodes: unknown,
    employerName: unknown,
    sickLeave: unknown
};

export const parse_health_check = ({ description, date, specialist, diagnosisCodes, healthCheckRating }: HealthCheckProps): NewHealthCheck => {
    const newEntry: NewHealthCheck = {
        type: 'HealthCheck',
        description: parse_string(description, 'description'),
        date: parse_date(date),
        specialist: parse_string(specialist, 'specialist'),
        diagnosisCodes: parse_array(diagnosisCodes, 'diagnosisCodes'),
        healthCheckRating: parse_rating(healthCheckRating),
    };
  
    return newEntry;
};