// TEXT FIELD
const Field = ({ label, value, func }) => { return (
    <div>
        <input
            placeholder={ label }
            value={ value }
            onChange={ func }
        />
    </div>
)}

// SUBMIT BUTTON
const Submit = ({ label }) => { return (
    <div>
        <button>{ label }</button>
    </div>
)}

export {
    Field,
    Submit
}