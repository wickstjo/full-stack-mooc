import { useDispatch } from 'react-redux'
import axios from 'axios'

const useAuth = ({ url }) => {

    // AUXILLARY
    const dispatch = useDispatch()

    // LOGIN USER
    const login = async (input) => {

        const query = axios.post(`${ url }/auth`, input)
        const response = await wrapper(query)

        // CATCH UNEXPECTED RESPONSES
        if (response.status !== 200) {
            return dispatch({
                type: 'notifications/negative',
                message: response.data.errors
            })
        }

        // SAVE TOKEN IN STATE
        dispatch({
            type: 'auth/login',
            credentials: {
                username: input.username,
                token: response.data.token
            }
        })

        // CREATE NOTIFICATION
        dispatch({
            type: 'notifications/positive',
            message: 'Successfully logged in'
        })

        dispatch({ type: 'prompts/hide' })
    }

    // REGISTER USER
    const register = async (input) => {

        const query = axios.post(url, input)
        const response = await wrapper(query)

        // CATCH UNEXPECTED RESPONSES
        if (response.status !== 201) {
            return dispatch({
                type: 'notifications/negative',
                message: response.data.errors
            })
        }

        // SAVE TOKEN IN STATE
        dispatch({
            type: 'auth/login',
            credentials: {
                username: input.username,
                token: response.data.token
            }
        })

        dispatch({
            type: 'notifications/positive',
            message: [
                'Successfully registered',
                'Successfully logged in'
            ]
        })

        dispatch({ type: 'prompts/hide' })
    }

    // QUERY WRAPPER
    const wrapper = async (query) => {
        try {
            return await query
        } catch (error) {
            return error.response
        }
    }

    return {
        login,
        register,
    }
}

export default useAuth