import { Patient } from "../types/patient";
import EntryBlock from './entry';

interface Props {
    target: Patient;
}

const Entries = ({ target }: Props) => {

    // NO ENTRIES
    if (target.entries.length === 0) { return (
        <div>
            <h2>Entries</h2>
            <li>No entries found.</li>
            <hr />
        </div>
    );}

    // OTHERWISE
    return (
        <div>
            <h2>Entries</h2>
            <div>
                { target.entries.map(entry =>
                    <EntryBlock
                        entry={ entry }
                        key={ entry.id }
                    />
                )}
            </div>
        </div>
    );
};

export default Entries;