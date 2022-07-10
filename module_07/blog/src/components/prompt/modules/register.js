import { useReducer } from 'react'
import { useDispatch } from 'react-redux'

import Form from '../../input/form'
import Field from '../../input/field'
import Button from '../../input/button'
import reducer from '../../input/reducer'

import * as user_funcs from '../../../funcs/user'

const Register = () => {

    // REDUX DISPATCH
    const dispatch = useDispatch()

    // INPUT STATES
    const [input, set_input] = useReducer(reducer, {
        username: '',
        name: '',
        password: '',
    })

    // REGISTER USER
    const trigger = async(event) => {
        event.preventDefault()
        
        // DEFAULT USER PROFILE
        const profile = {
            username: input.username,
            password: input.password
        }

        // IF DEFINED, PUSH NAME TO PROFILE
        if (input.name !== '') {
            profile.name = input.name
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
            set_input({ type: 'reset' })

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

        // RESET FIELDS & HIDE PROMPT
        dispatch({ type: 'prompts/hide' })
        set_input({ type: 'reset' })
    }

    return (
        <Form header={ 'register user' } func={ trigger }>
            <Field
                label={ 'What is your username?' }
                value={ input.username }
                target={ 'username' }
                func={ set_input }
            />
            <Field
                label={ 'What is your name?' }
                value={ input.name }
                target={ 'name' }
                func={ set_input }
            />
            <Field
                label={ 'What is your password?' }
                value={ input.password }
                type={ 'password' }
                target={ 'password' }
                func={ set_input }
            />
            <Button
                label={ 'Register' }
                required={[
                    input.username,
                    input.password,
                ]}
            />
        </Form>
    )
}

export default Register