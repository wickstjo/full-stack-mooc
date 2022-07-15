import { Form, useField } from '../../inputs'
import useAuth from '../../../hooks/auth'

const Register = () => {

    // AUTH SERVICE
    const auth_service = useAuth()

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
        placeholder: 'What is your password?',
        type: 'password'
    })

    // TRIGGER FORM
    const trigger = async() => {
        auth_service.register({
            username: username.value,
            name: name.value,
            password: password.value,
        })
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