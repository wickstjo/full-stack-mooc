import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client'

import { register, USERS } from '../../../models'
import { Form, useField } from '../../inputs'

const Register = () => {

    // AUXILLARY
    const dispatch = useDispatch()

    // CREATE BOOK
    const [registerUser] = useMutation(register, {
        refetchQueries: [{
            query: USERS.query
        }]
    })

    // USERNAME FIELD
    const username = useField({
        placeholder: 'What is your username?'
    })

    // GENRE FIELD
    const genre = useField({
        placeholder: 'What is your favorite book genre?',
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
            const response = await registerUser({
                variables: {
                    username: username.value,
                    password: password.value,
                    genre: genre.value,
                }
            })

            // SAVE CREDENTAILS IN STATE
            dispatch({
                type: 'auth/login',
                credentials: response.data.registerUser
            })
            
            // NOTIFY SUCCESS
            dispatch({
                type: 'notifications/positive',
                message: 'Registration successful'
            })

            // HIDE PROMPT
            dispatch({ type: 'prompts/hide' })
        
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
            header={ 'register user' }
            func={ trigger }
            fields={[ username, genre, password ]}
            button={{
                label: 'register',
                required: [ username, genre, password ]
            }}
        />
    )
}

export default Register