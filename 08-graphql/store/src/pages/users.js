import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Content from '../components/content'

const Users = () => {

    // GLOBAL STATE
    const { users } = useSelector(state => state.data)

    // LOCAL STATE
    const header = `All users (${ users.length })`
    const fallback = 'No users currently exist in the database.'

    return (
        <Content payload={[ header, fallback, users ]}>
            { users.map(item =>
                <div key={ item.id }>
                    <div><Link to={ `/users/${ item.id }` }>{ item.username }</Link></div>
                </div>
            )}
        </Content>
    )
}

export default Users