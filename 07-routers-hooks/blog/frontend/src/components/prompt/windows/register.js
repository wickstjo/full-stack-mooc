import Form from '../../inputs/form'
import useField from '../../../hooks/field'
import useAuth from '../../../hooks/auth'

const Register = () => {

    // AUTH SERVICE
    const auth_service = useAuth({
        url: 'http://localhost:3001/api/users'
    })

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

        // CREATE USER PROFILE
        const profile = {
            username: username.value,
            password: password.value
        }

        // IF DEFINED, PUSH NAME TO PROFILE
        if (name.value !== '') {
            profile.name = name.value
        }

        auth_service.register(profile)
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