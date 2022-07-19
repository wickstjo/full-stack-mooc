import { Gender } from '../types/patient';
import { HealthRating } from '../types/entry';

export const is_string = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const is_numeric = (param: unknown): boolean => {
    return typeof param === 'number';
};

export const is_date = (param: string): boolean => {
    return Boolean(Date.parse(param));
};

export const is_array = (param: unknown): boolean => {
    return typeof param === 'object' || param instanceof Array;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const is_gender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const is_rating = (param: any): param is HealthRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthRating).includes(param);
};

export const exists = (param: unknown | null | undefined, prop: string): unknown => {
    if (param === undefined || param === null) {
        throw new Error(`${ prop } is undefined or null`);
    }

    return param;
};