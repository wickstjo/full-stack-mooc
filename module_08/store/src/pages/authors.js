import { Link } from 'react-router-dom'
import { throttle } from '../misc'

import useResource from '../hooks/resource'
import Content from '../components/content'

const Authors = () => {

    // EXTENDED APOLLO HOOK
    const [data, loading] = useResource({
        target: 'allAuthors',
        query: `query {
            allAuthors {
                name
                born
                id
            }
        }`
    })
    
    return (
        <Content params={{ data, loading }}>
            { data.map(item =>
                <div key={ item.id }>
                    <div><Link to={ `/authors/${ item.id }` }>{ item.name }</Link></div>
                    <div>{ item.born }</div>
                </div>
            )}
        </Content>
    )
}

export default Authors