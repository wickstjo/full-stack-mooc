import { Link } from 'react-router-dom'
import { throttle } from '../misc'

import useResource from '../hooks/resource'
import Content from '../components/content'

const Books = () => {

    // EXTENDED APOLLO HOOK
    const [data, loading] = useResource({
        target: 'allBooks',
        query: `query {
            allBooks {
                id
                title
                published
            }
        }`
    })
    
    return (
        <Content params={{ data, loading }}>
            { data.map(item =>
                <div key={ item.id }>
                    <div><Link to={ `/books/${ item.id }` }>{ throttle(item.title, 50) }</Link></div>
                    <div>{ item.published }</div>
                </div>
            )}
        </Content>
    )
}

export default Books