import { Gender } from '../types/patient';
import { HealthRating, SickLeave, Discharge } from '../types/entry';
import { is_string, is_numeric, is_date, is_array, is_gender, is_rating, exists } from './basics';

export const parse_string = (param: unknown, prop: string): string => {
    if (!param || !is_string(param)) {
        throw new Error(`${ prop } property incorrect or missing. Expecting string.`);
    }
  
    return param;
};

export const parse_numeric = (param: unknown, prop: string): number => {
    if (!param || !is_numeric(param)) {
        throw new Error(`${ prop } property incorrect or missing. Expecting number.`);
    }
  
    return Number(param);
};

export const parse_date = (param: unknown): string => {
    if (!param || !is_string(param) || !is_date(param)) {
        throw new Error(`date property incorrect or missing. Expecting date.`);
    }

    return param;
};

export const parse_array = (param: unknown, prop: string): Array<string> => {

    // NOT DEFINED, RETURN EMPTY
    if (!param) { return []; }

    // DEFINED, BUT IS NOT AN ARRAY
    if (param && !is_array(param)) {
        throw new Error(`${ prop } property incorrect. Expecting arrray.`);
    }

    // TYPECAST ARRAY
    const foo = param as Array<unknown>;

    const container = foo.map(item => {
        console.log(item);
        if (is_string(item)) {
            return item;
        } else {
            throw new Error(`Array contains non-string values.`);
        }
        
    });
  
    return container;
};

export const parse_rating = (param: unknown): HealthRating => {
    if (!param || !is_rating(param)) {
        throw new Error(`Health ratign property incorrect or missing. Expecting one of [${ Object.values(HealthRating).join(', ') }].`);
    }
    
    return param;
};

export const parse_gender = (param: unknown): Gender => {
    if (!param || !is_gender(param)) {
        throw new Error(`gender property incorrect or missing. Expecting one of [${ Object.values(Gender).join(', ') }].`);
    }
    
    return param;
};

export const parse_sickleave = (param: unknown): SickLeave => {
    const parsed = exists(param, 'sickLeave') as SickLeave;
    
    return {
        startDate: parse_date(parsed.startDate),
        endDate: parse_date(parsed.endDate)
    };
};

export const parse_discharge = (param: unknown): Discharge => {
    const parsed = exists(param, 'sickLeave') as Discharge;
    
    return {
        date: parse_date(parsed.date),
        criteria: parse_string(parsed.criteria, 'criteria')
    };
};

parse_discharge