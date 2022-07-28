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

export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const is_gender = (param: any): param is Gender => {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
//     return Object.values(Gender).includes(param);
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const is_entry = (param: any): param is Entry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return true;
};

// export const parse_entries = (params: unknown): Array<Entry> => {
//     if (!params) {
//         throw new Error(`gender property incorrect or missing. Expecting one of`);
//     }

//     for (const param in params) {
//         if (!is_entry(param)) {
//             throw new Error(`gender property incorrect or missing. Expecting one of`);
//         }
//     }

//     return params;
// };