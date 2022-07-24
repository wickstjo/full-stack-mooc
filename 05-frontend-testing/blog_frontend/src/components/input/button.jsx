import { useState, useEffect } from 'react'

const Button = ({ label, required=false, func=false }) => {

    // ACTIVE STATUS
    const [status, set_status] = useState(false)

    // VALIDATE WHETHER REQUIRED FIELDS ARE FILLED
    useEffect(() => {
        if (required) {

            // DEFAULT TO FALSE
            let result = false

            // TOGGLE RESULT IF AN EMPTY STRING IS FOUND
            for (let item of required) {
                if (item.value === '') {
                    result = true
                    break
                }
            }

            // SET STATUS
            set_status(result)
        }
    }, [required])

    return (
        <input
            value={ label }
            type={ 'submit' }
            className={ 'button' }
            onClick={ func ? () => func() : null }
            disabled={ status }
        />
    )
}
export default Button