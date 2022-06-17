import { useState, useEffect } from 'react'
import Header from './header.js'

const Form = ({ header, children, func }) => { return (
    <div className={ 'wrapper' }>
        <Header text={ header } />
        <div className={ 'form' }>
            <form onSubmit={ func }>
                { children }
            </form>
        </div>
    </div>
)}

const Field = ({ label, type='text', value, func }) => { return (
    <input
        value={ value }
        placeholder={ label }
        onChange={ func }
        type={ type }
    />
)}

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
                result = true;
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

export {
    Form,
    Field,
    Button
}