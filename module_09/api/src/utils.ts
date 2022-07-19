import { Gender } from './types/patient';

const is_string = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const is_date = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const is_gender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

export const parse_string = (param: unknown, prop: string): string => {
    if (!param || !is_string(param)) {
        throw new Error(`${ prop } property incorrect or missing. Expecting string.`);
    }
  
    return param;
};

export const parse_date = (param: unknown): string => {
    if (!param || !is_string(param) || !is_date(param)) {
        throw new Error(`date property incorrect or missing. Expecting date.`);
    }

    return param;
};

export const parse_gender = (param: unknown): Gender => {
    if (!param || !is_gender(param)) {
        throw new Error(`gender property incorrect or missing. Expecting one of [${ Object.values(Gender).join(', ') }].`);
    }
    
    return param;
};






export const parse_string_array = (param: unknown): string => {
    if (!param || !is_string(param) || !is_date(param)) {
        throw new Error(`date property incorrect or missing. Expecting date.`);
    }

    return param;
};

export const parse_rating = (param: unknown): string => {
    if (!param || !is_string(param) || !is_date(param)) {
        throw new Error(`date property incorrect or missing. Expecting date.`);
    }

    return param;
};