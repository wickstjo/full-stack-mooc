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

export default Field