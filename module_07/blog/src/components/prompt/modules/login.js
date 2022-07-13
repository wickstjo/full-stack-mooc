import { Form, useField } from '../../inputs'
import useAuth from '../../../hooks/auth'

const Login = () => {

    // AUTH SERVICE
    const auth_service = useAuth()

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
    const trigger = async() => {
        auth_service.login({
            username: username.value,
            password: password.value,
        })
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