import { useReducer } from 'react'
import Form from '../input/form'
import Field from '../input/field'
import Button from '../input/button'
import input_reducer from '../../reducers/input'

const Login = ({ state }) => {

    // INPUT STATES
    const [input, set_input] = useReducer(input_reducer, {
        username: '',
        password: '',
    })

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