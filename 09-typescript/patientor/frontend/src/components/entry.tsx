import { Entry } from "../types/entry";
import Diagnosis from "./diagnosis";

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${ JSON.stringify(value) }`
    );
};

interface Props {
    entry: Entry;
}

const EntryBlock = ({ entry }: Props) => {
    switch (entry.type) {
        
        case 'Hospital': { return (
            <div>
                <div>Hospital @ { entry.date }</div>
                <li>{ entry.description }</li>
                <div>Specialist: { entry.specialist }</div>
                { entry.diagnosisCodes ?
                    <div>
                        <br />
                        <div>Diagnosis:</div>
                        <div>
                            { entry.diagnosisCodes.map(code =>
                                <Diagnosis
                                key={ code }
                                code={ code }
                                />
                                )}
                        </div>
                    </div>
                : null }
                <br />
                <div>Discharge reason: { entry.discharge.criteria }</div>
                <div>Discharge date: { entry.discharge.date }</div>
                <hr />
            </div>
        );}
        
        case 'OccupationalHealthcare': { return (
            <div>
                <div>Healthcare @ { entry.date }</div>
                <li>{ entry.description }</li>
                <div>Employer: { entry.employerName }</div>
                <div>Specialist: { entry.specialist }</div>
                <br />
                { entry.diagnosisCodes ?
                    <div>
                        <div>Diagnosis:</div>
                        <div>
                            { entry.diagnosisCodes.map(code =>
                                <Diagnosis
                                    key={ code }
                                    code={ code }
                                />
                            )}
                        </div>
                    </div>
                : null }
                <hr />
            </div>
        );}
        
        case 'HealthCheck': { return (
            <div>
                <div>HealthCheck @ { entry.date }</div>
                <li>{ entry.description }</li>
                <div>Specialist: { entry.specialist }</div>
                <br />
                <div>Rating: { entry.healthCheckRating }</div>
                <hr />
            </div>
        );}

        default: {
            return assertNever(entry);
        }
    }
};

export default EntryBlock;