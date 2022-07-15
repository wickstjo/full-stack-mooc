import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client'

import { login } from '../../../models'
import { Form, useField } from '../../inputs'

const Register = () => {

    // AUXILLARY
    const dispatch = useDispatch()

    // CREATE BOOK
    const [userLogin] = useMutation(login)

    // USERNAME FIELD
    const username = useField({
        placeholder: 'What is your username?'
    })

    // PASSWORD FIELD
    const password = useField({
        placeholder: 'What is your password?',
        type: 'password'
    })

    // TRIGGER FORM
    const trigger = async () => {

        // ATTEMPT TO UPDATE THE AUTHOR
        try {
            await userLogin({
                variables: {
                    username: username.value,
                    password: password.value,
                }
            })
            
            // NOTIFY SUCCESS
            dispatch({
                type: 'notifications/positive',
                message: 'Login successful'
            })

            // HIDE PROMPT
            dispatch({  type: 'prompts/hide' })
        
        // CATCH & RENDER VALIDATION ERRORS
        } catch (error) {
            dispatch({
                type: 'notifications/negative',
                message: error.graphQLErrors.map(item => item.message)
            })
        }
    }

    return (
        <Form
            header={ 'update author' }
            func={ trigger }
            fields={[ username, password ]}
            button={{
                label: 'update',
                required: [ username, password ]
            }}
        />
    )
}

export default Register