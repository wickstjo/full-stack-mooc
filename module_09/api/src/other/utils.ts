import { Gender } from './types';

const is_string = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parse_string = (param: unknown): string => {
    if (!param || !is_string(param)) {
        throw new Error('Incorrect or missing string');
    }
  
    return param;
};

const is_date = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parse_date = (date: unknown): string => {
    if (!date || !is_string(date) || !is_date(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }

    return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const is_gender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parse_gender = (param: unknown): Gender => {
    if (!param || !is_gender(param)) {
        throw new Error('Incorrect or missing gender: ' + param);
    }
    
    return param;
};

// const generate_id = (): string => {
//     const data: unknown = uuid();

//     if (data instanceof String) {
//         throw Error('Faulty UUID generated');
//     }

//     return String(data);
// };

export {
    parse_string,
    parse_date,

    parse_gender,
};