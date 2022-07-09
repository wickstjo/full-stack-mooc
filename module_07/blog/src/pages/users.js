import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetch_all } from '../funcs/user'

const Users = () => {

    // REDUX STUFF
    const dispatch = useDispatch()

    // LOCAL STATE
    const [users, set_users] = useState([])

    // ON LOAD, ATTEMPT TO FETCH BLOGS
    useEffect(() => {
        fetch_all().then(response => {
            
            // CATCH ERRORS
            if (response.status !== 200) {
                return dispatch({
                    type: 'notifications/negative',
                    message: `Could not fetch users from DB (${ response.status })`
                })
            }

            // OTHERWISE, PUSH RESULT TO STATE
            set_users(response.data)

            // CREATE NOTIFICATION
            dispatch({
                type: 'notifications/positive',
                message: 'Users fetched from DB'
            })
        })
    }, [])

    return (
        <div id={ 'wrapper' }>
            <div id={ 'header' }>Users</div>
            <div id={ 'content' }>
                <Swapper users={ users } />
            </div>
        </div>
    )
}

const Swapper = ({ users }) => {
    switch (users.length) {

        case 0: { return (
            <div id={ 'blog' }>
                <div className={ 'row' }>
                    No users found.
                </div>
            </div>
        )}

        default: { 
            return users.map(blog =>
                <div id={ 'blog' }>
                    <div className={ 'row' }>
                        <div>{ blog.title }</div>
                        <div>{ blog.likes } Likes</div>
                    </div>
                </div>
            )
        }
    }
}

export default Users