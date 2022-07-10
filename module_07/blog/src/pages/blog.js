import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import * as blog_funcs from '../funcs/blog'
import Wrapper from '../components/wrapper'
import Actions from '../components/actions'

const Blog = () => {

    // HOOKS
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const params = useParams()
    const navigator = useNavigate()

    // LOCAL STATE
    const [blog, set_blog] = useState(null)

    // ON LOAD, CHECK IF THE BLOG EXISTS
    useEffect(() => {
        blog_funcs.fetch_specific(params.id).then(response => {

            // CATCH ERRORS
            if (response.status !== 200) {
                set_blog(undefined)

                return dispatch({
                    type: 'notifications/negative',
                    message: response.data.errors
                })
            }

            // OTHERWISE, SAVE BLOG IN STATE
            set_blog(response.data)

            // CREATE NOTIFICATION
            dispatch({
                type: 'notifications/positive',
                message: 'Blog found'
            })
        })
    }, [dispatch, params.id])

    // REMOVE BLOG
    const remove = async () => {

        // ATTEMPT TO REMOVE THE BLOG
        const response = await blog_funcs.remove(params.id, auth.token)

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
            message: 'Blog successfully removed'
        })

        // REDIRECT AWAY FROM PAGE
        navigator('/blogs')
    }

    // UPDATE BLOG
    const update = async (input) => {

        // ATTEMPT TO LOGIN
        const response = await blog_funcs.update(input, params.id, auth.token)

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
            message: 'Blog updated'
        })

        console.log(blog)
        
        // UPDATE BLOG IN STATE
        set_blog({
            ...blog,
            ...input
        })
        
        console.log(blog)
        // CLOSE THE PROMPT WINDOW
        dispatch({ type: 'prompts/hide' })
    }

    // LIKE BLOG
    const like = async () => {

        // ATTEMPT TO REMOVE THE BLOG
        const response = await blog_funcs.like(params.id, auth.token)

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
            message: 'Liked blog'
        })

        // UPDATE BLOG IN STATE
        set_blog({
            ...blog,
            likes: blog.likes + 1
        })
    }

    // DISLIKE BLOG
    const dislike = async () => {

        // ATTEMPT TO REMOVE THE BLOG
        const response = await blog_funcs.dislike(params.id, auth.token)

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

        // UPDATE BLOG IN STATE
        set_blog({
            ...blog,
            likes: blog.likes - 1
        })
    }

    switch (blog) {

        // NO DATA
        case null: { return null }

        // USER NOT FOUND
        case undefined: { return (
            <Wrapper header={ 'blog not found' }>
                <div>A blog with this ID does not exist.</div> 
            </Wrapper>
        )}

        // USER FOUND
        default: { return (
            <Wrapper header={ 'blog found' }>
                <div>
                    <div>Title:</div>
                    <div>{ blog.title }</div>
                </div>
                <div>
                    <div>Author:</div>
                    <div>{ blog.author }</div>
                </div>
                <div>
                    <div>URL:</div>
                    <div><a href={ blog.url } target={ '_blank' } rel={ 'noreferrer' }>{ blog.url }</a></div>
                </div>
                <div>
                    <div>Likes:</div>
                    <div>{ blog.likes }</div>
                </div>
                <div>
                    <div>Added By:</div>
                    <div><Link to={ `/users/${ blog.user.id }` }>{ blog.user.username }</Link></div>
                </div>
                <Actions
                    blog={ blog }
                    actions={{
                        like, dislike, update, remove
                    }}
                />
            </Wrapper>
        )}
    }
}

export default Blog