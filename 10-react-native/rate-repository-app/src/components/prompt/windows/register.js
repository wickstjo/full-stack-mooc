import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client'

import { REGISTER, LOGIN } from '../../../gql/mutations'
import Form from '../../inputs/form'
import useField from '../../../hooks/field'
import useStorage from '../../../hooks/storage'

export default () => {

    // AUXILLARY
    const dispatch = useDispatch()
    const storage = useStorage()

    // MUTATIONS
    const [createUser] = useMutation(REGISTER)
    const [authenticate] = useMutation(LOGIN)

    // USERNAME FIELD
    const username = useField({
        placeholder: 'What is your username?'
    })

    // PASSWORD FIELD
    const password = useField({
        placeholder: 'What is your password?',
    })

    // PASSWORD FIELD
    const password_again = useField({
        placeholder: 'Write your password again?',
    })

    // TRIGGER FORM
    const trigger = async() => {

        // CATCH VALIDATION ERRORS
        if (username.value === '' || password.value === '' || password_again.value === '') {
            return dispatch({
                type: 'notifications/negative',
                message: 'Every field is required.'
            })
        }

        if (username.value.length < 1 || username.value.length > 30) {
            return dispatch({
                type: 'notifications/negative',
                message: 'A username must be of length 1 to 30'
            })
        }

        if (password.value !== password_again.value) {
            return dispatch({
                type: 'notifications/negative',
                message: 'Passwords do not match.'
            })
        }

        if (password.value.length < 5 || password.value.length > 50) {
            return dispatch({
                type: 'notifications/negative',
                message: 'A password must be of length 5 to 50'
            })
        }

        // START AUTH PROCESS
        try {
            const user_block = {
                username: username.value,
                password: password.value,
            }

            // ATTEMPT TO REGISTER
            await createUser({
                variables: {
                    user: user_block
                }
            })

            // ATTEMPT TO REGISTER
            const response = await authenticate({
                variables: {
                    credentials: user_block
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
                message: 'Successfully registered & logged in!'
            })

            dispatch({ type: 'prompts/hide' })
        
        // CATCH & RENDER ERRORS
        } catch (error) {
            console.log(error)
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