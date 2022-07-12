import { useDispatch } from 'react-redux'
import { Form, useField } from '../../inputs'

import * as user_funcs from '../../../funcs/user'

const Register = () => {

    // REDUX DISPATCH
    const dispatch = useDispatch()

    // USERNAME FIELD
    const username = useField({
        placeholder: 'What is your username?'
    })

    // NAME FIELD
    const name = useField({
        placeholder: 'What is your name?'
    })

    // PASSWORD FIELD
    const password = useField({
        placeholder: 'What is your username?',
        type: 'password'
    })

    // REGISTER USER
    const trigger = async() => {
        
        // DEFAULT USER PROFILE
        const profile = {
            username: username.value,
            password: password.value
        }

        // IF DEFINED, PUSH NAME TO PROFILE
        if (name.value !== '') {
            profile.name = name.value
        }

        // ATTEMPT TO REGISTER
        const register_response = await user_funcs.create(profile)

        // CATCH ERRORS
        if (register_response.status !== 201) {
            return dispatch({
                type: 'notifications/negative',
                message: register_response.data.errors
            })
        }

        // OTHERWISE, CREATE NOTIFICATION
        dispatch({
            type: 'notifications/positive',
            message: 'Successfully registered user',
        })

        // ATTEMPT TO LOGIN
        const login_response = await user_funcs.login({
            username: profile.username,
            password: profile.password,
        })

        // CATCH ERRORS
        if (login_response.status !== 200) {
            dispatch({
                type: 'notifications/negative',
                message: login_response.data.errors
            })

            // RESET FIELDS & HIDE PROMPT
            dispatch({ type: 'prompts/hide' })

            return
        }

        // OTHERWISE, SAVE CREDENTIALS IN STATE
        dispatch({
            type: 'auth/login',
            credentials: login_response.data
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
            header={ 'register user' }
            func={ trigger }
            fields={[ username, name, password ]}
            button={{
                label: 'register',
                required: [ username, password ]
            }}
        />
    )
}

export default Register