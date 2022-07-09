import './styles.scss'
import { useReducer } from 'react'
import { useDispatch } from 'react-redux'
import reducer from '../reducers/input'

import Form from '../components/input/form'
import Field from '../components/input/field'
import Button from '../components/input/button'

const Register = () => {

    // REDUX DISPATCH
    const dispatch = useDispatch()

    // INPUT STATES
    const [input, set_input] = useReducer(reducer, {
        username: '',
        name: '',
        password: '',
    })

    // TRIGGER FORM
    const trigger = async(event) => {
        event.preventDefault()
        
        dispatch({
            type: 'notifications/positive',
            message: 'register trigger',
        })

        // const success = await state.func(input)

        // // RESET FIELDS IF CHECKS PASS
        // if (success) {
        //     set_input({
        //         type: 'reset'
        //     })
        // }
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