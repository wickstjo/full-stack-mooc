import { Link } from 'react-router-dom'
import useResource from '../hooks/resource'
import Wrapper from '../components/wrapper'

const Blogs = () => {

    // FETCH RESOURCE
    const [blogs] = useResource({
        url: 'http://localhost:3001/api/blogs'
    })

    switch (blogs) {

        // NOTHING LOADED
        case null: { return (
            <Wrapper header={ 'error' }>
                <div>A list of blogs cannot be fetched from the server.</div> 
            </Wrapper>
        )}

        // ARRAY FOUND
        default: {

            // SORT THE BLOGS BY LIKES
            const sorted = blogs.sort((a, b) => b.likes - a.likes)

            switch (blogs.length) {

                // NO BLOGS FOUND
                case 0: { return (
                    <Wrapper header={ 'blogs' }>
                        <div>No blogs exist.</div> 
                    </Wrapper>
                )}
        
                // LIST USERS
                default: { return (
                    <Wrapper header={ `blogs (${ blogs.length })` }>
                        { sorted.map((blog, index) =>
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