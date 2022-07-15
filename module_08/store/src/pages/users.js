import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { all_users } from '../models'

import Wrapper from '../components/wrapper'

const Users = () => {

    // APOLLO HOOK
    const target = 'allUsers'
    const result = useQuery(all_users)

    // DONE LOADING
    if (!result.loading && result.data[target]) {
        
        // SHORTHAND
        const data = result.data[target]
        
        switch (data.length) {

            // NO DATA
            case 0: { return (
                <Wrapper header={ 'all users' }>
                    <div>There are currently no users available.</div>
                </Wrapper>
            )}

            // RENDER NORMALLY
            default: { return (
                <Wrapper header={ `all users (${ result.data[target].length })` }>
                    { result.data[target].map(item =>
                        <div key={ item.id }>
                            <div><Link to={ `/users/${ item.id }` }>{ item.username }</Link></div>
                        </div>
                    )}
                </Wrapper>
            )}
        }
    }
}

export default Users