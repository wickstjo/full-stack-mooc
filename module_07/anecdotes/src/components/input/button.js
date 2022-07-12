import { useState, useEffect } from 'react'

const Button = ({ label, required=[], func=()=>{} }) => {

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
            id={ 'submit' }
            disabled={ status }
            onClick={ () => func ? func() : null  }
        />
    )
}

export default Button