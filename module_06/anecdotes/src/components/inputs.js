const Field = ({ label, value, target, func }) => {

    // UPDATE INPUT FIELDS
    const update_input = (event) => {
        func({
            type: 'update',
            target: target,
            payload: event.target.value
        })
    }

    return (
        <div>
            <input
                value={ value }
                placeholder={ label }
                id={ target }
                onChange={ update_input }
                type={ 'text' }
            />
        </div>
    )
}

const Button = ({ label, func }) => { return (
    <div>
        <button onClick={ func }>{ label }</button>
    </div>
)}

export {
    Field,
    Button
}