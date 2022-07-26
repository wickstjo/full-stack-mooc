import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const useResource = ({ url }) => {

    // AUXILLARY HOOKS
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigator = useNavigate()

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

    // CREATE NEW RESOURCE
    const create = async({ payload, category }) => {

        // EXECUTE QUERY
        const response = await wrapper(
            axios.post(url, payload, auth.header)
        )

        // CATCH ERRORS
        if (response.status !== 201) {
            return dispatch({
                type: 'notifications/negative',
                message: response.data.errors
            })
        }

        // REDIRECT TO RESOURCE PAGE
        navigator(`/${ category }/${ response.data.id }`)

        // CREATE NOTIFICATION
        dispatch({
            type: 'notifications/positive',
            message: 'Resource created',
        })

        // HIDE PROMPT
        dispatch({ type: 'prompts/hide' })
    }

    // REMOVE RESOURCE
    const remove = async () => {

        // EXECUTE QUERY
        const response = await wrapper(
            axios.delete(url, auth.header)
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

        // REDIRECT TO BLOGS
        navigator('/blogs')
    }

    // UPDATE RESOURCE
    const update = async (payload) => {

        // EXECUTE QUERY
        const response = await wrapper(
            axios.put(url, payload, auth.header)
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

        // UPDATE STATE
        set_resource({
            ...resource,
            ...payload
        })
    }

    // LIKE RESOURCE
    const like = async () => {

        // EXECUTE QUERY
        const response =  await wrapper(
            axios.get(`${ url }/like`, auth.header)
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

        // UPDATE LIKES IN STATE
        set_resource({
            ...resource,
            likes: resource.likes + 1
        })
    }

    // DISLIKE RESOURCE
    const dislike = async () => {

        // ATTEMPT TO REMOVE THE BLOG
        const response = await wrapper(
            axios.get(`${ url }/dislike`, auth.header)
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
            message: 'Disliked resource'
        })

        // UPDATE LIKES IN STATE
        set_resource({
            ...resource,
            likes: resource.likes - 1
        })
    }

    // LEAVE COMMENT
    const comment = async (comment) => {

        // EXECUTE QUERY
        const response =  await wrapper(
            axios.post(`${ url }/comment`, { comment }, auth.header)
        )

        // CATCH ERRORS
        if (response.status !== 200) {
            return dispatch({
                type: 'notifications/negative',
                message: response.data.errors
            })
        }

        // UPDATE LIKES IN STATE
        set_resource({
            ...resource,
            comments: [
                ...resource.comments,
                comment
            ]
        })

        // CREATE NOTIFICATION
        dispatch({
            type: 'notifications/positive',
            message: 'Comment added'
        })

        // CLOSE THE PROMPT WINDOW
        dispatch({ type: 'prompts/hide' })
    }

    return [resource, {
        create,
        remove,
        update,
        like,
        dislike,
        comment
    }]
}

export default useResource