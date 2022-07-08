const Field = ({ label, value, func }) => { return (
    <div>
        <input
            placeholder={ label }
            value={ value }
            onChange={ func }
        />
    </div>
)}

export default Field;