import { useReducer } from 'react'
import { useDispatch } from 'react-redux'

import Form from '../../input/form'
import Field from '../../input/field'
import Button from '../../input/button'
import reducer from '../../input/reducer'

import * as user_funcs from '../../../funcs/user'

const Login = () => {

    // REDUX DISPATCH
    const dispatch = useDispatch()

    // INPUT STATES
    const [input, set_input] = useReducer(reducer, {
        username: '',
        password: '',
    })

    // LOGIN USER
    const trigger = async(event) => {
        event.preventDefault()

        // ATTEMPT TO LOGIN
        const response = await user_funcs.login(input)

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

        // RESET FIELDS & HIDE PROMPT
        dispatch({ type: 'prompts/hide' })
        set_input({ type: 'reset' })
    }

    return (
        <Form header={ 'login user' } func={ trigger }>
            <Field
                label={ 'What is your username?' }
                value={ input.username }
                target={ 'username' }
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
                label={ 'Login' }
                required={[
                    input.username,
                    input.password
                ]}
            />
        </Form>
    )
}

export default Login