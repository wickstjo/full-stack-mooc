import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetch_all } from '../funcs/blog'
import { Link } from 'react-router-dom'
import Wrapper from '../components/wrapper'

const Blogs = () => {

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
                    message: `Could not fetch blogs from DB (${ response.status })`
                })
            }

            // OTHERWISE, PUSH RESULT TO STATE
            set_data(response.data)

            // CREATE NOTIFICATION
            dispatch({
                type: 'notifications/positive',
                message: 'Blogs fetched from DB'
            })
        })
    }, [dispatch])

    switch (data) {

        // NOTHING LOADED
        case null: { return null }

        // ARRAY FOUND
        default: {
            switch (data.length) {

                // NO BLOGS FOUND
                case 0: { return (
                    <Wrapper header={ 'blogs' }>
                        <div>No blogs exist.</div> 
                    </Wrapper>
                )}
        
                // LIST USERS
                default: { return (
                    <Wrapper header={ `blogs (${ data.length })` }>
                        { data.map((blog, index) =>
                            <div className={ 'row' } key={ index }>
                                <div><Link to={ blog.id }>{ blog.title }</Link></div>
                                <div>{ blog.likes } Likes</div>
                            </div>
                        )}
                    </Wrapper>
                )}
            }
        }
    }
}

export default Blogs