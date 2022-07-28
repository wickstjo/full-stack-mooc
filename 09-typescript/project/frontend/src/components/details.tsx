import { Patient } from "../types/patient";

interface Props {
    target: Patient;
}

const Details = ({ target }: Props) => { return (
    <div>
        <h2>{ target.name } ({ target.gender })</h2>
        { target.ssn ? <div>SSN: { target.ssn }</div> : null }
        <div>Occupation: { target.occupation }</div>
    </div>
);};

export default Details;