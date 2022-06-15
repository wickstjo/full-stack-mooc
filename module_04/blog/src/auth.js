import { useReducer } from 'react'
import { Form, Text, Button } from './components/form'
import { create_user, login_user } from './funcs/user';
import input_reducer from './reducers/input';

const Auth = ({ set_credentials, notify }) => {

    // INPUT STATES
    const [input, set_input] = useReducer(input_reducer, {
        login_user: '',
        login_pass: '',
        register_user: '',
        register_name: '',
        register_pass: '',
    })

    // UPDATE INPUT FIELDS
    const update_input = (event, target) => {
        set_input({
            type: 'update',
            target: target,
            payload: event.target.value
        })
    }

    // ATTEMPT TO LOGIN USER
    const login = async (event) => {
        event.preventDefault()

        // ATTEMPT TO LOGIN
        const response = await login_user({
            username: input.login_user,
            password: input.login_pass,
        })

        // ALL OK -- TRANSITION TO USER PAGE
        if (response.status === 200) {

            // RESET FIELDS & SET TOKEN
            set_input({ type: 'reset' })
            set_credentials(response.data)

            // NOTIFY USER
            notify({
                type: 'positive',
                message: 'User successfully logged in!'
            })

            return
        }

        // OTHERWISE, CREATE ERROR
        notify({
            type: 'negative',
            message: [
                `Could not log you in (${ response.status })`,
                ...response.data.errors
            ]
        })
    }
    
    // ATTEMPT TO REGISTER USER
    const register = async (event) => {
        event.preventDefault()

        // DEFAULT USER PROFILE
        const profile = {
            username: input.register_user,
            password: input.register_pass
        }

        // IF DEFINED, PUSH NAME TO PROFILE
        if (input.register_name !== '') {
            profile.name = input.register_name
        }
        
        // ATTEMPT TO REGISTER
        const create_response = await create_user(profile)

        // ALL OK -- USER CREATED
        if (create_response.status === 201) {
            
            // NOTIFY USER
            notify({
                type: 'positive',
                message: 'User successfully created!'
            })

            // ATTEMPT TO LOGIN
            const login_response = await login_user({
                username: profile.username,
                password: profile.password,
            })

            // ALL OK -- TRANSITION TO USER PAGE
            if (login_response.status === 200) {

                // RESET FIELDS & SET TOKEN
                set_input({ type: 'reset' })
                set_credentials(login_response.data)

                // NOTIFY USER
                notify({
                    type: 'positive',
                    message: 'User successfully logged in!'
                })

                return
            }

            // RESET INPUT STATES
            set_input({ type: 'reset' })

            // NOTIFY USER
            notify({
                type: 'negative',
                message: [
                    `Could not log you in (${ login_response.status })`,
                    ...login_response.data.errors
                ]
            })

            return
        }

        // OTHERWISE, RENDER ERROR
        notify({
            type: 'negative',
            message: [
                `Could not register you in (${ create_response.status })`,
                ...create_response.data.errors
            ]
        })
    }

    return (
        <div className={ 'container2' }>
            <div>
                <Form header={ 'login' } func={ login }>
                    <Text
                        label={ 'What is your username?' }
                        value={ input.login_user }
                        func={
                            event => update_input(event, 'login_user')
                        }
                    />
                    <Text
                        label={ 'What is your password?' }
                        value={ input.login_pass }
                        func={
                            event => update_input(event, 'login_pass')
                        }
                    />
                    <Button label={ 'Login' } />
                </Form>
                <Form header={ 'register' } func={ register }>
                    <Text
                        label={ 'What is your username?' }
                        value={ input.register_user }
                        func={
                            event => update_input(event, 'register_user')
                        }
                    />
                    <Text
                        label={ 'What is your name?' }
                        value={ input.register_name }
                        func={
                            event => update_input(event, 'register_name')
                        }
                    />
                    <Text
                        label={ 'What is your password?' }
                        value={ input.register_pass }
                        func={
                            event => update_input(event, 'register_pass')
                        }
                    />
                    <Button label={ 'Register' } />
                </Form>
            </div>
        </div>
    )
}

export default Auth;