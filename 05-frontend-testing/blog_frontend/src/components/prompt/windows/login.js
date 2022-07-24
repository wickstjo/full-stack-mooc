import Form from '../../input/form'
import useField from '../../../hooks/field'
import useAuth from '../../../hooks/auth'

const Login = () => {

    // AUTH SERVICE
    const auth = useAuth({
        url: 'http://localhost:3001/api/users'
    })

    const username = useField({
        placeholder: 'What is your username?'
    })

    const password = useField({
        placeholder: 'What is your password?',
        type: 'password'
    })

    const trigger = async () => {
        await auth.login({
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