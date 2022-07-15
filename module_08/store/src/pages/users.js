import { Link } from 'react-router-dom'
import { USERS } from '../models'

import Content from '../components/content'
import useExtract from '../hooks/extractor'

const Users = () => {

    // APOLLO QUERY
    const [data, config] = useExtract(USERS)

    return (
        <Content payload={ config } header={ 'all users' }>
            { data.map(item =>
                <div key={ item.id }>
                    <div><Link to={ `/users/${ item.id }` }>{ item.username }</Link></div>
                </div>
            )}
        </Content>
    )
}

export default Users