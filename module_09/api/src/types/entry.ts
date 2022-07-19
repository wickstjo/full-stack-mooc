import { Diagnosis } from './diagnosis';

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

enum HealthRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheck extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthRating;
}

interface Discharge {
    date: string;
    criteria: string;
}

interface SickLeave {
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


export type NewHealthCheck = Omit<HealthCheck, 'id' | 'type'>;
export type NewOccupationalHealthcare = Omit<OccupationalHealthcare, 'id' | 'type'>;
export type NewHospital = Omit<Hospital, 'id' | 'type'>;

type HealthCheckProps = {
    description: unknown,
    date: unknown,
    specialist: unknown,
    diagnosisCodes: unknown,
    healthCheckRating: unknown
};

import { parse_string, parse_date, parse_string_array, parse_rating } from '../utils';

export const parse_patient = ({ description, date, specialist, diagnosisCodes, healthCheckRating }: HealthCheckProps): NewHealthCheck => {
    const newEntry: NewHealthCheck = {
        description: parse_string(description, 'description'),
        date: parse_date(date),
        specialist: parse_string(specialist, 'specialist'),
        diagnosisCodes: parse_string_array(diagnosisCodes, 'diagnosisCodes'),
        healthCheckRating: parse_rating(healthCheckRating, 'healthCheckRating'),
    };
  
    return newEntry;
};