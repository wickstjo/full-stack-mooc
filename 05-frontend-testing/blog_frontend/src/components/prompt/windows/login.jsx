import Form from '../../input/form'
import useField from '../../../hooks/field'
import useAuth from '../../../hooks/auth'

const Login = ({ mock_trigger=false }) => {

    // AUTH SERVICE
    const service = useAuth({
        url: 'http://localhost:3001/api/users'
    })

    const username = useField({
        placeholder: 'What is your username?',
        id: 'login_username'
    })

    const password = useField({
        placeholder: 'What is your password?',
        type: 'password',
        id: 'login_password'
    })

    const trigger = async () => {

        // ONLY FOR UNIT TESTING
        if (mock_trigger) {
            return mock_trigger({
                username: username.value,
                password: password.value,
            })
        }

        await service.login({
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