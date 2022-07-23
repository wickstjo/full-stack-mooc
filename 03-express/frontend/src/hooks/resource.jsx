import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const useResource = ({ url }) => {

    // AUXILLARY
    const [resource, set_resource] = useState([])
    const dispatch = useDispatch()

    // ON LOAD, FETCH DATA FROM API
    useEffect(() => {
        axios.get(url).then(response => {
            set_resource(response.data)

            dispatch({
                type: 'notifications/positive',
                message: 'Dataset loaded'
            })

        }).catch(error => {
            dispatch({
                type: 'notifications/negative',
                message: [
                    'Could not fetch DB data',
                    error.message
                ]
            })
        })
    }, [url, dispatch])

    // ADD ENTRY TO STATE
    const create = async (payload) => {

        // CHECK IF THE NAME EXISTS
        const exists = resource.find(entry => entry.name === payload.name)

        // IF IT DOES, RE-ROUTE TO UPDATE
        if (exists) {
            if (window.confirm(`This will overwrite an existing user`)) {
                return update(exists.id, {
                    ...exists,
                    ...payload
                })
            }

            return false
        }

        // OTHERWISE, CREATE THEM
        try {
            const response = await axios.post(url, payload)
    
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

            return dispatch({
                type: 'notifications/positive',
                message: 'Entry successfully added'
            })

        // CATCH ERRORS
        } catch (error) {
            dispatch({
                type: 'notifications/negative',
                message: [
                    `COULD NOT CREATE ENTRY IN DB: ${ error.message }`,
                    ...error.response.data.errors
                ]
            })

            return false
        }
    }

    // UPDATE ENTRY IN STATE
    const update = async (id, payload) => {
        try {
            const adjusted_url = `${ url }/${ id }`
            const response = await axios.put(adjusted_url, payload)
            
            // CATCH UNEXPECTED STATUSES
            if (response.status !== 200) {
                dispatch({
                    type: 'notifications/negative',
                    message: [
                        `COULD NOT UPDATE ENTRY IN DB: ${ response.status }`,
                        ...response.data.errors
                    ]
                })

                return false
            }
    
            // FIND & MODIFY THE ENTRY
            const cloned = [...resource]
            const target = resource.findIndex(entry => entry.id === id)
            cloned[target] = payload
    
            // UPDATE STATE
            set_resource(cloned)

            return dispatch({
                type: 'notifications/positive',
                message: 'Entry successfully updated'
            })

        // CATCH ERRORS
        } catch (error) {
            dispatch({
                type: 'notifications/negative',
                message: [
                    `COULD NOT UPDATE ENTRY IN DB: ${ error.message }`,
                    ...error.response.data.errors
                ]
            })

            return false
        }
    }
    
    // REMOVE ENTRY FROM STATE
    const remove = async (id) => {
        try {
            if (window.confirm(`Remove person?`)) {
                const adjusted_url = `${ url }/${ id }`
                const response = await axios.delete(adjusted_url)
        
                // CATCH UNEXPECTED STATUSES
                if (response.status !== 204) {
                    return dispatch({
                        type: 'notifications/negative',
                        message: [
                            `COULD NOT REMOVE ENTRY FROM DB: ${ response.status }`,
                            ...response.data.errors
                        ]
                    })
                }
        
                // UPDATE STATE
                const cloned = [...resource].filter(entry => entry.id !== id)
                set_resource(cloned)

                dispatch({
                    type: 'notifications/positive',
                    message: 'Entry successfully removed'
                })
            }

        // CATCH ERRORS
        } catch (error) {
            dispatch({
                type: 'notifications/negative',
                message: [
                    `COULD NOT REMOVE ENTRY FROM DB: ${ error.message }`,
                    ...error.response.data.errors
                ]
            })
        }
    }

    return [resource, {
        create,
        update,
        remove
    }]
}

export default useResource