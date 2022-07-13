import { useParams, Link } from 'react-router-dom'

import useResource from '../hooks/resource'
import Wrapper from '../components/wrapper'
import Actions from '../components/actions'
import { Fragment } from 'react'

const Blog = () => {

    // URL PARAMS
    const params = useParams()

    // FETCH RESOURCE
    const [blog, service] = useResource({
        url: `http://localhost:3001/api/blogs/${ params.id }`
    })

    switch (blog) {

        // NO DATA
        case null: { return (
            <Wrapper header={ 'error' }>
                <div>A blog with this ID cannot be found.</div> 
            </Wrapper>
        )}

        // USER FOUND
        default: { return (
            <Fragment>
                <Wrapper header={ `blog ${ params.id }` }>
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
                        service={ service }
                    />
                </Wrapper>
                <Wrapper header={ `comments (${ blog.comments.length })` }>
                    { blog.comments.map((comment, index) =>
                        <div key={ index }>{ comment }</div>
                    )}
                </Wrapper>
            </Fragment>
        )}
    }
}

export default Blog