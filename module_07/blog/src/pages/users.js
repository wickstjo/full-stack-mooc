import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetch_all } from '../funcs/user'
import { Link } from 'react-router-dom'
import Wrapper from '../components/wrapper'

const Users = () => {

    // REDUX STUFF
    const dispatch = useDispatch()

    // LOCAL STATE
    const [data, set_data] = useState(null)

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
            set_data(response.data)

            // CREATE NOTIFICATION
            dispatch({
                type: 'notifications/positive',
                message: 'Users fetched from DB'
            })
        })
    }, [dispatch])

    switch (data) {

        // NO DATA
        case null: { return null }

        // ARRAY FOUND
        default: {
            switch (data.length) {

                // NO USERS FOUND
                case 0: { return (
                    <Wrapper header={ 'users' }>
                        <div>No users exist.</div> 
                    </Wrapper>
                )}

                // LIST USERS
                default: { return (
                    <Wrapper header={ `users (${ data.length })` }>
                        { data.map((user, index) =>
                            <div className={ 'row' } key={ index }>
                                <div><Link to={ user.id }>{ user.username }</Link></div>
                                <div>{ user.blogs.length } Blogs</div>
                            </div>
                        )}
                    </Wrapper>
                )}
            }
        }
    }
}

export default Users