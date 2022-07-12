import { useDispatch } from 'react-redux'

import { Form, useField } from '../../inputs'
import * as user_funcs from '../../../funcs/user'

const Login = () => {

    // REDUX DISPATCH
    const dispatch = useDispatch()

    // USERNAME FIELD
    const username = useField({
        placeholder: 'What is your username?'
    })

    // PASSWORD FIELD
    const password = useField({
        placeholder: 'What is your password?',
        type: 'password'
    })

    // LOGIN USER
    const trigger = async() => {

        // ATTEMPT TO LOGIN
        const response = await user_funcs.login({
            username: username.value,
            password: password.value,
        })

        // CATCH ERRORS
        if (response.status !== 200) {
            return dispatch({
                type: 'notifications/negative',
                message: response.data.errors
            })
        }

        // OTHERWISE, SAVE CREDENTIALS IN STATE
        dispatch({
            type: 'auth/login',
            credentials: response.data
        })

        // CREATE NOTIFICATION
        dispatch({
            type: 'notifications/positive',
            message: 'Successfully logged in',
        })

        // HIDE PROMPT
        dispatch({ type: 'prompts/hide' })
    }

    return (
        <Form
            header={ 'login user' }
            func={ trigger }
            fields={[ username, password ]}
            button={{
                label: 'Login',
                required: [ username, password ]
            }}
        />
    )
}

export default Login