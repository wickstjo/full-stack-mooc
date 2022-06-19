import PropTypes from 'prop-types'

const Field = ({ label, type='text', value, func }) => { return (
    <input
        value={ value }
        placeholder={ label }
        onChange={ func }
        type={ type }
    />
)}

Field.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    func: PropTypes.func.isRequired,
}

export default Field