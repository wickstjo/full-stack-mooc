import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const useResource = ({ url }) => {

    // AUXILLARY HOOKS
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigator = useNavigate()

    // QUERY HEADER
    const [header] = useState({
        headers: {
            Authorization: `Bearer ${ auth.token }`
        }
    })

    // RESOURCE STATE
    const [resource, set_resource] = useState(null)

    // ON LOAD, LOAD RESOURCE
    useEffect(() => {
        axios.get(url).then(response => {
    
            // CATCH NON-INTENDED RESPONSES
            if (response.status !== 200) {
                dispatch({
                    type: 'notifications/negative',
                    message: response.data.errors
                })
            }

            // SAVE RESPONSE IN STATE
            set_resource(response.data)
        
        // CATCH STATUS 400
        }).catch(error => {
            dispatch({
                type: 'notifications/negative',
                message: error.response.data.errors
            })
        })
    }, [url, dispatch])

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

    // OVERWRITE RESOURCE
    const overwrite = (params) => {
        set_resource({
            ...resource,
            ...params
        })
    }

    // CREATE NEW RESOURCE
    const create = async(payload) => {
        console.log('create trigger')

        // // PUSH ID & PERFORM QUERY
        // payload.id = Number((Math.random() * 100000000).toFixed(0))
        // const response = await axios.post(url, payload)

        // // ALL OK
        // if (response.status === 201) {

        //     // PUSH TO RESOURCES
        //     set_resource([
        //         ...resource,
        //         payload
        //     ])

        //     return true
        // }

        // return false
    }

    // REMOVE ITEM
    const remove = async ({ redirect=false }) => {

        // EXECUTE QUERY
        const response = await wrapper(
            axios.delete(url, header)
        )

        // CATCH ERRORS
        if (response.status !== 204) {
            return dispatch({
                type: 'notifications/negative',
                message: response.data.errors
            })
        }

        // CREATE NOTIFICATION
        dispatch({
            type: 'notifications/positive',
            message: 'Resource removed'
        })

        // REDIRECT WHEN REQUESTED
        if (redirect) { navigator(redirect) }
    }

    // UPDATE BLOG
    const update = async ({ payload }) => {

        // EXECUTE QUERY
        const response = await wrapper(
            axios.put(url, payload, header)
        )

        // CATCH ERRORS
        if (response.status !== 200) {
            return dispatch({
                type: 'notifications/negative',
                message: response.data.errors
            })
        }

        // CREATE NOTIFICATION
        dispatch({
            type: 'notifications/positive',
            message: 'Resource updated'
        })

        // CLOSE THE PROMPT WINDOW
        dispatch({ type: 'prompts/hide' })
    }

    // LIKE BLOG
    const like = async () => {

        // EXECUTE QUERY
        const response =  await wrapper(
            axios.get(`${ url }/increment`, header)
        )

        // CATCH ERRORS
        if (response.status !== 200) {
            return dispatch({
                type: 'notifications/negative',
                message: response.data.errors
            })
        }

        // CREATE NOTIFICATION
        dispatch({
            type: 'notifications/positive',
            message: 'Liked resource'
        })
    }

    // DISLIKE BLOG
    const dislike = async () => {

        // ATTEMPT TO REMOVE THE BLOG
        const response = await wrapper(
            axios.get(`${ url }/decrement`, header)
        )

        // CATCH ERRORS
        if (response.status !== 200) {
            return dispatch({
                type: 'notifications/negative',
                message: response.data.errors
            })
        }

        // CREATE NOTIFICATION
        dispatch({
            type: 'notifications/positive',
            message: 'Disliked blog'
        })
    }

    return [resource, {
        overwrite,
        create,
        remove,
        update,
        like,
        dislike
    }]
}

export default useResource