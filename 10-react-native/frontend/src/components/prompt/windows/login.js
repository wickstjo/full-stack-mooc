import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client'

import { LOGIN } from '../../../gql/mutations'
import Form from '../../inputs/form'
import useField from '../../../hooks/field'
import useStorage from '../../../hooks/storage'

export default ({ mock_trigger=false }) => {

    // AUXILLARY
    const dispatch = useDispatch()

    // LOGIN MUTATION
    const [authenticate] = useMutation(LOGIN)
    const storage = useStorage()

    // USERNAME FIELD
    const username = useField({
        placeholder: 'What is your username?'
    })

    // PASSWORD FIELD
    const password = useField({
        placeholder: 'What is your password?',
        password: true
    })

    // TRIGGER FORM
    const trigger = async() => {

        // ONLY FOR UNIT TESTING
        if (mock_trigger) {
            return mock_trigger({
                username: username.value,
                password: password.value,
            })
        }

        // CATCH VALIDATION ERRORS
        if (username.value === '' || password.value === '') {
            return dispatch({
                type: 'notifications/negative',
                message: 'Both fields are required.'
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
            header={ 'login user' }
            func={ trigger }
            fields={[ username, password ]}
            required={[ username, password ]}
            button={ 'Login' }
        />
    )
}