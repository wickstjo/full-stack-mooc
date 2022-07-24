import Form from '../../input/form'
import useField from '../../../hooks/field'
import useAuth from '../../../hooks/auth'

const Register = ({ mock_trigger=false }) => {

    // AUTH SERVICE
    const service = useAuth({
        url: 'http://localhost:3001/api/users'
    })

    const username = useField({
        placeholder: 'What is your username?',
        id: 'register_username',
    })

    const name = useField({
        placeholder: 'What is your name?',
        id: 'register_name',
    })

    const password = useField({
        placeholder: 'What is your password?',
        type: 'password',
        id: 'register_password',
    })

    const trigger = async() => {

        // CREATE USER PROFILE
        const profile = {
            username: username.value,
            password: password.value
        }

        // IF DEFINED, PUSH NAME TO PROFILE
        if (name.value !== '') {
            profile.name = name.value
        }

        // ONLY FOR UNIT TESTING
        if (mock_trigger) {
            return mock_trigger(profile)
        }

        await service.register(profile)
    }

    return (
        <Form
            header={ 'register user' }
            func={ trigger }
            fields={[ username, name, password ]}
            required={[ username, password ]}
            button={ 'register' }
        />
    )
}

export default Register