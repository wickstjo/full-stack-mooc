import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

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
            id={ 'submit' }
            disabled={ status }
        />
    )
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    required: PropTypes.array.isRequired,
}

export default Button