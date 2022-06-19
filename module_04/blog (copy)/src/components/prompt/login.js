import { useReducer } from 'react'
import { Form, Field, Button } from '../input'
import input_reducer from '../../reducers/input'

const Login = ({ state }) => {

    // INPUT STATES
    const [input, set_input] = useReducer(input_reducer, {
        username: '',
        password: '',
    })

    // UPDATE INPUT FIELDS
    const update_input = (event, target) => {
        set_input({
            type: 'update',
            target: target,
            payload: event.target.value
        })
    }

    // TRIGGER FORM
    const trigger = async (event) => {
        event.preventDefault()
        const success = await state.func(input)

        // RESET FIELDS IF CHECKS PASS
        if (success) {
            set_input({
                type: 'reset'
            })
        }
    }

    return (
        <Form header={ 'Login user' } func={ trigger }>
            <Field
                label={ 'What is your username?' }
                value={ input.username }
                func={
                    event => update_input(event, 'username')
                }
            />
            <Field
                label={ 'What is your password?' }
                value={ input.password }
                type={ 'password' }
                func={
                    event => update_input(event, 'password')
                }
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