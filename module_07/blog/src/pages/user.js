import { useState, useEffect, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { fetch_specific } from '../funcs/user'
import Wrapper from '../components/wrapper'

const User = () => {

    // HOOKS
    const dispatch = useDispatch()
    const params = useParams()

    // LOCAL STATE
    const [user, set_user] = useState(null)

    // ON LOAD, CHECK IF THE BLOG EXISTS
    useEffect(() => {
        fetch_specific(params.id).then(response => {

            // CATCH ERRORS
            if (response.status !== 200) {
                set_user(undefined)
                
                return dispatch({
                    type: 'notifications/negative',
                    message: response.data.errors
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
    }, [dispatch, params.id])

    switch (user) {

        // NO DATA
        case null: { return null }

        // USER NOT FOUND
        case undefined: { return (
            <Wrapper header={ 'user not found' }>
                <div>A user with this ID does not exist.</div> 
            </Wrapper>
        )}

        // USER FOUND
        default: { return (
            <Fragment>
                <Wrapper header={ 'user found' }>
                    <div>
                        <div>Username:</div>
                        <div>{ user.username }</div>
                    </div>
                    { user.name ?
                        <div>
                            <div>Name:</div>
                            <div>{ user.name }</div>
                        </div>
                    : null }
                </Wrapper>
                <Wrapper header={ 'added blogs' }>
                    { user.blogs.length === 0 ?
                        <div>No blogs found.</div>
                    :
                        user.blogs.map((item, index) =>
                            <div key={ index }>
                                <div><Link to={ `/blogs/${ item.id }` }>{ item.title }</Link></div>
                                <div>{ item.likes } Likes</div>
                            </div>
                        )
                    }
                </Wrapper>
            </Fragment>
        )}
    }
}

export default User