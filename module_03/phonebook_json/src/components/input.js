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

// SUBMIT BUTTON
const Button = ({ label, func }) => { return (
    <span onClick={ func }>{ label }</span>
)}

export {
    Field,
    Submit,
    Button
}