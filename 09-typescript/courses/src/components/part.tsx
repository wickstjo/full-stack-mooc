import React from 'react';
import { Course } from '../types';

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${ JSON.stringify(value) }`
    );
};

interface Props {
    details: Course
}

const Part = ({ details }: Props) => {
    switch (details.type) {

        case 'normal': { return (
            <p>
                <div>{ details.name } ({ details.exerciseCount })</div>
                <div>{ details.description }</div>
            </p>
        )}

        case 'groupProject': { return (
            <p>
                <div>{ details.name } ({ details.exerciseCount })</div>
                <div>Project exercises: { details.groupProjectCount }</div>
            </p>
        )}

        case 'submission': { return (
            <p>
                <div>{ details.name } ({ details.exerciseCount })</div>
                <div>Submit to: { details.exerciseSubmissionLink }</div>
            </p>
        )}

        case 'special': { return (
            <p>
                <div>{ details.name } ({ details.exerciseCount })</div>
                <div>Requirements: { details.requirements.join(', ') }</div>
            </p>
        )}

        default: {
            return assertNever(details);
        }
    }
};
  
export default Part;