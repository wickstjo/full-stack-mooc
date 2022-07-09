import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetch_specific } from '../funcs/user'

const User = () => {

    // HOOKS
    const dispatch = useDispatch()
    const params = useParams()

    // LOCAL STATE
    const [user, set_user] = useState(undefined)

    // ON LOAD, CHECK IF THE BLOG EXISTS
    useEffect(() => {
        fetch_specific(params.id).then(response => {

            // CATCH ERRORS
            if (response.status !== 200) {
                return response.data.errors.forEach(error => {
                    dispatch({
                        type: 'notifications/negative',
                        message: error
                    })
                })
            }

            // OTHERWISE, SAVE BLOG IN STATE
            set_user(response.data)

            // CREATE NOTIFICATION
            dispatch({
                type: 'notifications/positive',
                message: 'User found'
            })
        })
    }, [])

    return (
        <div id={ 'wrapper' }>
            <div id={ 'header' }>User ({ params.id })</div>
            <div id={ 'content' }>
                <Swapper user={ user } />
            </div>
        </div>
    )
}

// CONTENT SWAPPER
const Swapper = ({ user }) => {
    switch (user) {

        // NO BLOG FOUND, RENDER ERROR
        case undefined: { return (
            <div id={ 'blog' }>
                <div className={ 'row' }>
                    A user with this ID does not exist.
                </div>
            </div>
        )}

        // OTHERWISE, RENDER NORMALLY
        default: { return (
            <div id={ 'blog' }>
                TODO: TRUE USER HERE
                {/* <div className={ 'row' }>
                    <div>Author:</div>
                    <div id={ 'author' }>{ blog.author }</div>
                </div>
                <div className={ 'row' }>
                    <div>URL:</div>
                    <div><a href={ blog.url } target={ '_blank' } rel={ 'noreferrer' } id={ 'url' }>{ blog.url }</a></div>
                </div>
                <div className={ 'row' }>
                    <div>Likes:</div>
                    <div id={ 'likes' }>{ blog.likes }</div>
                </div>
                <div className={ 'row' }>
                    <div>Added by:</div>
                    <div id={ 'added_by' }>{ blog.user.username }</div>
                </div> */}
            </div>
        )}
    }
}

export default User