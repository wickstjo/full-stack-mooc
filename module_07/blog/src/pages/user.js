import {  Fragment } from 'react'
import { useParams, Link } from 'react-router-dom'
import useResource from '../hooks/resource'
import Wrapper from '../components/wrapper'

const User = () => {
    
    // URL PARAMS
    const params = useParams()

    // FETCH RESOURCE
    const [user] = useResource({
        url: `http://localhost:3001/api/users/${ params.id }`
    })

    switch (user) {

        // NO DATA
        case null: { return (
            <Wrapper header={ 'error' }>
                <div>A user with this ID cannot be found.</div> 
            </Wrapper>
        )}

        // USER FOUND
        default: { return (
            <Fragment>
                <Wrapper header={ `user ${ params.id }` }>
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
                <Wrapper header={ 'blogs added by' }>
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