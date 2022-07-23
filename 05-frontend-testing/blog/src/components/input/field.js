import PropTypes from 'prop-types'

const Field = ({ label, type='text', value, target, func }) => {

    // UPDATE INPUT FIELDS
    const update_input = (event) => {
        func({
            type: 'update',
            target: target,
            payload: event.target.value
        })
    }

    return (
        <input
            value={ value }
            placeholder={ label }
            id={ target }
            onChange={ update_input }
            type={ type }
        />
    )
}

Field.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    func: PropTypes.func.isRequired,
}

export default Field