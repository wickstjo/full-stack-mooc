import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Form = ({ header, func, children }) => {

    // SEPARATE INPUTS FROM BUTTON
    const inputs = [ ...children ]
    const button = inputs.pop()

    return (
        <div id={ 'wrapper' }>
            <div className={ 'header' }>{ header }</div>
            <form onSubmit={ func }>
                <div id={ 'content' }>{ inputs }</div>
                { button }
            </form>
        </div>
    )
}

Form.propTypes = {
    header: PropTypes.string.isRequired,
    func: PropTypes.func.isRequired,
}

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

const Button = ({ label, required }) => {

    // ACTIVE STATUS
    const [status, set_status] = useState(true)

    // VALIDATE WHETHER REQUIRED FIELDS ARE FILLED
    useEffect(() => {

        // DEFAULT TO FALSE
        let result = false

        // TOGGLE RESULT IF AN EMPTY STRING IS FOUND
        for (let item of required) {
            if (item === '') {
                result = true
                break
            }
        }

        // SET STATUS
        set_status(result)
    }, [required])

    return (
        <input
            value={ label }
            type={ 'submit' }
            className={ 'submit' }
            disabled={ status }
        />
    )
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    required: PropTypes.array.isRequired,
}

export {
    Form,
    Field,
    Button
}