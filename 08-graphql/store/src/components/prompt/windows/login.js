import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client'

import { LOGIN } from '../../../gql/auth'
import { Form, useField } from '../../inputs'

const Login = () => {

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

    // TRIGGER FORM
    const trigger = async () => {

        // ATTEMPT TO UPDATE THE AUTHOR
        try {
            const response = await loginUser({
                variables: {
                    username: username.value,
                    password: password.value,
                }
            })

            // SAVE CREDENTAILS IN STATE
            dispatch({
                type: 'auth/login',
                credentials: response.data.loginUser
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
            header={ 'login user' }
            func={ trigger }
            fields={[ username, password ]}
            button={{
                label: 'login',
                required: [ username, password ]
            }}
        />
    )
}

export default Login