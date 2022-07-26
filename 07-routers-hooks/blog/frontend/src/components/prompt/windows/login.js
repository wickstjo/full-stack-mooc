import Form from '../../inputs/form'
import useField from '../../../hooks/field'
import useAuth from '../../../hooks/auth'

const Login = () => {

    // AUTH SERVICE
    const auth_service = useAuth({
        url: 'http://localhost:3001/api/users'
    })

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
            required={[ username, password ]}
            button={ 'login' }
        />
    )
}

export default Login