import { Link } from 'react-router-dom'
import useResource from '../hooks/resource'
import Wrapper from '../components/wrapper'

const Users = () => {

    // FETCH RESOURCE
    const [users] = useResource({
        url: 'http://localhost:3001/api/users'
    })

    switch (users) {

        // NOTHING LOADED
        case null: { return (
            <Wrapper header={ 'error' }>
                <div>A list of users cannot be fetched from the server.</div> 
            </Wrapper>
        )}

        // ARRAY FOUND
        default: {

            // SORT THE BLOGS BY LIKES
            const sorted = users.sort((a, b) => b.blogs.length - a.blogs.length)

            switch (sorted.length) {

                // NO USERS FOUND
                case 0: { return (
                    <Wrapper header={ 'users' }>
                        <div>No users exist.</div> 
                    </Wrapper>
                )}

                // LIST USERS
                default: { return (
                    <Wrapper header={ `users (${ sorted.length })` }>
                        { sorted.map((user, index) =>
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