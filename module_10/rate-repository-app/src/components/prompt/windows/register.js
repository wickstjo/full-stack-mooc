import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client'

import { LOGIN } from '../../../gql/mutations'
import Form from '../../inputs/form'
import useField from '../../../hooks/field'

export default () => {

    // AUXILLARY
    const dispatch = useDispatch()

    // CREATE BOOK
    const [loginUser] = useMutation(LOGIN)

    // USERNAME FIELD
    const username = useField({
        placeholder: 'What is your username?'
    })

    // PASSWORD FIELD
    const password = useField({
        placeholder: 'What is your password?',
        type: 'password'
    })

    // PASSWORD FIELD
    const password_again = useField({
        placeholder: 'Write your password again?',
        type: 'password'
    })

    // TRIGGER FORM
    const trigger = async() => {

        // CATCH VALIDATION ERRORS
        if (username.value === '' || password.value === '') {
            return dispatch({
                type: 'notifications/negative',
                message: 'Every field is required.'
            })
        }

        // START AUTH PROCESS
        try {

            // ATTEMPT TO AUTHENTICATE
            const response = await authenticate({
                variables: {
                    credentials: {
                        username: username.value,
                        password: password.value,
                    }
                }
            })

            // WRAP CREDENTIALS INTO ONE
            const credentials = {
                username: username.value,
                token: response.data.authenticate.accessToken
            }

            // SAVE IN STORAGE
            await storage.save(credentials)

            // SAVE CREDENTAILS IN STATE
            dispatch({
                type: 'auth/login',
                credentials
            })

            // NOTIFY USER & HIDE PROMPT
            dispatch({
                type: 'notifications/positive',
                message: 'Successfully logged in!'
            })

            dispatch({ type: 'prompts/hide' })
        
        // CATCH & RENDER ERRORS
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
            fields={[ username, password, password_again ]}
            required={[ username, password, password_again ]}
            button={ 'Register' }
        />
    )
}