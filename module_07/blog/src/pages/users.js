import { Link } from 'react-router-dom'
import useResource from '../hooks/resource'
import Wrapper from '../components/wrapper'

const Users = () => {

    // FETCH RESOURCE
    const [data] = useResource({
        url: 'http://localhost:3001/api/users'
    })

    switch (data) {

        // NOTHING LOADED
        case null: { return (
            <Wrapper header={ 'error' }>
                <div>A list of users cannot be fetched from the server.</div> 
            </Wrapper>
        )}

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