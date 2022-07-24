import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const useResource = ({ url, resource_name, fetch_data=false }) => {

    // REDUX STATE
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    // ON LOAD, FETCH DATA FROM API
    useEffect(() => {
        if (fetch_data) {
            fetch_all()
        }
    }, [url, dispatch])

    // FETCH ALL RESOURCES
    const fetch_all = async () => {

        const query = axios.get(url)
        const response = await wrapper(query)

        // CATCH UNEXPECTED STATUSES
        if (response.status !== 200) {
            return dispatch({
                type: 'notifications/negative',
                message: response.data.errors
            })
        }

        dispatch({
            type: 'resources/overwrite',
            resource: resource_name,
            payload: response.data
        })

        dispatch({
            type: 'notifications/positive',
            message: 'Dataset successfully retrieved'
        })
    }

    // FETCH ONE RESOURCE ENTRY
    const fetch_one = async (id) => {

        const adjusted_url = `${ url }/${ id }`
        const query = axios.get(adjusted_url)
        const response = await wrapper(query)

        // CATCH UNEXPECTED STATUSES
        if (response.status !== 200) {
            return dispatch({
                type: 'notifications/negative',
                message: response.data.errors
            })
        }

        // PUSH TO STATE
        dispatch({
            type: 'resources/create',
            resource: resource_name,
            entry: response.data
        })

        dispatch({
            type: 'notifications/positive',
            message: 'Entry successfully retrieved'
        })
    }

    // CREATE RESOURCE ENTRY
    const create = async (payload) => {

        const query = axios.post(url, payload, auth.header)
        const response = await wrapper(query)

        // CATCH UNEXPECTED STATUSES
        if (response.status !== 201) {
            return dispatch({
                type: 'notifications/negative',
                message: response.data.errors
            })
        }

        // PUSH TO STATE
        dispatch({
            type: 'resources/create',
            resource: resource_name,
            entry: response.data
        })

        dispatch({
            type: 'notifications/positive',
            message: 'Entry successfully added'
        })

        dispatch({ type: 'prompts/hide' })
    }

    // UPDATE EXISTING ENTRY
    const update = async (payload) => {

        const adjusted_url = `${ url }/${ payload.id }`
        const query = axios.put(adjusted_url, payload, auth.header)
        const response = await wrapper(query)

        // CATCH UNEXPECTED STATUSES
        if (response.status !== 200) {
            return dispatch({
                type: 'notifications/negative',
                message: response.data.errors
            })
        }

        // PUSH TO STATE
        dispatch({
            type: 'resources/update',
            resource: resource_name,
            entry: payload
        })

        dispatch({
            type: 'notifications/positive',
            message: 'Entry successfully updated'
        })

        dispatch({ type: 'prompts/hide' })
    }

    // REMOVE RESOURCE ENTRY
    const remove = async (id) => {

        const adjusted_url = `${ url }/${ id }`
        const query = axios.delete(adjusted_url, auth.header)
        const response = await wrapper(query)

        // CATCH UNEXPECTED STATUSES
        if (response.status !== 204) {
            return dispatch({
                type: 'notifications/negative',
                message: response.data.errors
            })
        }

        // PUSH TO STATE
        dispatch({
            type: 'resources/remove',
            resource: resource_name,
            id
        })

        dispatch({
            type: 'notifications/positive',
            message: 'Entry successfully removed'
        })

        dispatch({ type: 'prompts/hide' })
    }

    // LIKE RESOURCE ENTRY
    const like = async (id) => {

        const adjusted_url = `${ url }/${ id }/like`
        const query = axios.get(adjusted_url, auth.header)
        const response = await wrapper(query)

        // CATCH UNEXPECTED STATUSES
        if (response.status !== 200) {
            return dispatch({
                type: 'notifications/negative',
                message: response.data.errors
            })
        }

        // PUSH TO STATE
        dispatch({
            type: 'resources/update',
            resource: resource_name,
            entry: {
                id,
                likes: response.data.likes
            }
        })

        dispatch({
            type: 'notifications/positive',
            message: 'Liked entry'
        })

        dispatch({ type: 'prompts/hide' })
    }

    // DISLIKE RESOURCE ENTRY
    const dislike = async (id) => {

        const adjusted_url = `${ url }/${ id }/dislike`
        const query = axios.get(adjusted_url, auth.header)
        const response = await wrapper(query)

        // CATCH UNEXPECTED STATUSES
        if (response.status !== 200) {
            return dispatch({
                type: 'notifications/negative',
                message: response.data.errors
            })
        }

        // PUSH TO STATE
        dispatch({
            type: 'resources/update',
            resource: resource_name,
            entry: {
                id,
                likes: response.data.likes
            }
        })

        dispatch({
            type: 'notifications/positive',
            message: 'Disliked entry'
        })

        dispatch({ type: 'prompts/hide' })
    }

    // QUERY WRAPPER
    const wrapper = async (query) => {
        try {
            return await query
        } catch (error) {

            // RENDER AXIOS ERRORS
            if (error.message) {
                dispatch({
                    type: 'notifications/negative',
                    message: error.message
                })
            }

            return error.response
        }
    }

    return {
        fetch_all,
        fetch_one,
        create,
        update,
        remove,
        like,
        dislike,
    }
}

export default useResource