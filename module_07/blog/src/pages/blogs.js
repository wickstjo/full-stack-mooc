import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetch_all } from '../funcs/blog'

const Blogs = () => {

    // REDUX STUFF
    const dispatch = useDispatch()

    // LOCAL STATE
    const [blogs, set_blogs] = useState([])

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
            set_blogs(response.data)

            // CREATE NOTIFICATION
            dispatch({
                type: 'notifications/positive',
                message: 'Blogs fetched from DB'
            })
        })
    }, [])

    return (
        <div id={ 'wrapper' }>
            <div id={ 'header' }>Blogs</div>
            <div id={ 'content' }>
                <Swapper blogs={ blogs } />
            </div>
        </div>
    )
}

const Swapper = ({ blogs }) => {
    switch (blogs.length) {

        case 0: { return (
            <div id={ 'blog' }>
                <div className={ 'row' }>
                    No blogs found.
                </div>
            </div>
        )}

        default: { 
            return blogs.map(blog =>
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

export default Blogs