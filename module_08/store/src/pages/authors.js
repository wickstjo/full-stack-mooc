import { Link } from 'react-router-dom'
import { AUTHORS } from '../models'
import useExtract from '../hooks/extractor'
import Content from '../components/content'

const Authors = () => {

    // APOLLO QUERY
    const [data, config] = useExtract(AUTHORS)

    return (
        <Content payload={ config } header={ 'all authors' }>
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