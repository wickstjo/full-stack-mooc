import Form from '../../input/form'
import useField from '../../../hooks/field'
import useAuth from '../../../hooks/auth'

const Register = () => {

    // AUTH SERVICE
    const auth = useAuth({
        url: 'http://localhost:3001/api/users'
    })

    const username = useField({
        placeholder: 'What is your username?'
    })

    const name = useField({
        placeholder: 'What is your name?'
    })

    const password = useField({
        placeholder: 'What is your password?',
        type: 'password'
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

        await auth.register(profile)
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