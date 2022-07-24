import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const useResource = ({ url, fetch_data=true }) => {

    // REDUX STATE
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    // RESOURCE STATE
    const [resource, set_resource] = useState([])

    // ON LOAD, FETCH DATA FROM API
    useEffect(() => {
        if (fetch_data) {
            axios.get(url).then(response => {
                set_resource(response.data)

                dispatch({
                    type: 'notifications/positive',
                    message: 'Dataset loaded'
                })

            }).catch(error => {
                dispatch({
                    type: 'notifications/negative',
                    message: error.message
                })
            })
        }
    }, [url, dispatch])

    const create = async (payload) => {

        const query = axios.post(url, payload)
        const response = await wrapper(query)

        // CATCH UNEXPECTED STATUSES
        if (response.status !== 201) {
            return dispatch({
                type: 'notifications/negative',
                message: response.data.errors
            })
        }

        // PUSH TO STATE
        set_resource([
            ...resource,
            response.data
        ])

        dispatch({
            type: 'notifications/positive',
            message: 'Entry successfully added'
        })

        dispatch({ type: 'promps/hide' })
    }

    const update = async (id, payload) => {

        const adjusted_url = `${ url }/${ id }`
        const query = axios.put(adjusted_url, payload)
        const response = await wrapper(query)

        // CATCH UNEXPECTED STATUSES
        if (response.status !== 200) {
            return dispatch({
                type: 'notifications/negative',
                message: response.data.errors
            })
        }

        // FIND & MODIFY THE ENTRY
        const cloned = [...resource]
        const target = resource.findIndex(entry => entry.id === id)
        cloned[target] = payload

        // UPDATE STATE
        set_resource(cloned)

        dispatch({
            type: 'notifications/positive',
            message: 'Entry successfully updated'
        })

        dispatch({ type: 'promps/hide' })
    }

    // REMOVE ENTRY FROM STATE
    const remove = async (id) => {

        const adjusted_url = `${ url }/${ id }`
        const query = axios.delete(adjusted_url)
        const response = await wrapper(query)

        // CATCH UNEXPECTED STATUSES
        if (response.status !== 200) {
            return dispatch({
                type: 'notifications/negative',
                message: `COULD NOT REMOVE ENTRY FROM DB: ${ response.status }`
            })
        }

        // UPDATE STATE
        const cloned = [...resource].filter(entry => entry.id !== id)
        set_resource(cloned)

        dispatch({
            type: 'notifications/positive',
            message: 'Entry successfully removed'
        })

        dispatch({ type: 'promps/hide' })
    }

    // QUERY WRAPPER
    const wrapper = async (query) => {
        try {
            return await query
        } catch (error) {
            return error.response
        }
    }

    return [resource, {
        create,
        update,
        remove
    }]
}

export default useResource