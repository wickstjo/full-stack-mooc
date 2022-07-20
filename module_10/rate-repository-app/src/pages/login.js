import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-native';
import { useMutation } from '@apollo/client'
import { LOGIN } from '../gql/mutations'

import Container from '../components/container'
import Header from '../components/header'

import Field from '../components/inputs/field'
import Button from '../components/inputs/button'

import useField from '../hooks/field'
import useStorage from '../hooks/storage'

export default () => {

    // LOGIN MUTATION
    const [authenticate] = useMutation(LOGIN)

    // GLOBAL STATE
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const storage = useStorage()

    // USERNAME FIELD
    const username = useField({
        placeholder: 'Username'
    })

    // PASSWORD FIELD
    const password = useField({
        placeholder: 'Password'
    })

    // TRIGGER FORM
    const trigger = async() => {

        // CATCH VALIDATION ERRORS
        if (username.value === '' || password.value === '') {
            return dispatch({
                type: 'notifications/negative',
                message: 'A username and password is required.'
            })
        }

        // START AUTH PROCESS
        try {

            // ATTEMPT TO AUTHENTICATE
            const response = await authenticate({
                variables: {
                    credentials: {
                        username: username.value,
                        password: password.value,
                    }
                }
            })

            // WRAP CREDENTIALS INTO ONE
            const credentials = {
                username: username.value,
                token: response.data.authenticate.accessToken
            }

            // SAVE IN STORAGE
            await storage.save(credentials)

            // SAVE CREDENTAILS IN STATE
            dispatch({
                type: 'auth/login',
                credentials
            })

            // NOTIFY USER
            dispatch({
                type: 'notifications/positive',
                message: 'Successfully logged in!'
            })
        
        // CATCH & RENDER ERRORS
        } catch (error) {
            dispatch({
                type: 'notifications/negative',
                message: error.graphQLErrors.map(item => item.message)
            })
        }
    }

    switch (auth.session) {

        // NO SESSION, RENDER NORMALLY
        case false: { return (
            <Container>
                <Header text={ 'Login User' } />
                <Field { ...username } />
                <Field { ...password } />
                <Button
                    label={ 'Login' }
                    func={ trigger }
                />
            </Container>
        )}

        // OTHERWISE, REDIRECT
        default: { return (
            <Navigate to={ '/' } replace />
        )}
    }
}