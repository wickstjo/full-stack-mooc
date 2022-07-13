import { useDispatch } from 'react-redux'
import axios from 'axios'

const useAuth = () => {

    // AUXILLARY HOOKS
    const dispatch = useDispatch()

    // QUERY WRAPPER
    const wrapper = async (query) => {
        try {
            return query.then(response => {
                return response
            }).catch(error => {
                return error.response
            })
        } catch (error) {
            return error.response
        }
    }

    // LOGIN USER
    const login = async(payload) => {

        // EXECUTE QUERY
        const response = await wrapper(
            axios.post('http://localhost:3001/api/login', payload)
        )

        // CATCH ERRORS
        if (response.status !== 200) {
            return dispatch({
                type: 'notifications/negative',
                message: response.data.errors
            })
        }

        // OTHERWISE, SAVE CREDENTIALS IN STATE
        dispatch({
            type: 'auth/login',
            credentials: response.data
        })

        // CREATE NOTIFICATION
        dispatch({
            type: 'notifications/positive',
            message: 'Logged in successfully',
        })

        // HIDE PROMPT
        dispatch({ type: 'prompts/hide' })
    }

    // REGISTER USER
    const register = async(payload) => {

        // DEFAULT USER PROFILE
        const profile = {
            username: payload.username,
            password: payload.password
        }

        // IF DEFINED, PUSH NAME TO PROFILE
        if (payload.name !== '') {
            profile.name = payload.name
        }

        // EXECUTE QUERY
        const response = await wrapper(
            axios.post('http://localhost:3001/api/users', profile)
        )

        // CATCH ERRORS
        if (response.status !== 201) {
            return dispatch({
                type: 'notifications/negative',
                message: response.data.errors
            })
        }

        // CREATE NOTIFICATION
        dispatch({
            type: 'notifications/positive',
            message: 'Registration successfully',
        })

        // HIDE PROMPT
        dispatch({ type: 'prompts/hide' })
    }

    return {
        login,
        register,
    }
}

export default useAuth