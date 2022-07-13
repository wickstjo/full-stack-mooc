import { useParams } from 'react-router-dom'
import useResource from '../hooks/resource'

import { Button } from '../components/inputs'
import Content from '../components/content'

const Author = () => {

    // EXTRACT URL PARAMS
    const params = useParams()

    // EXTENDED APOLLO HOOK
    const [data, loading] = useResource({
        target: 'findAuthor',
        query: `query {
            findAuthor(id: "${ params.id }") {
                name
                bookCount
            }
        }`
    })

    return (
        <Content params={{ data, loading }}>
            <div>
                <div>Name:</div>
                <div>{ data.name }</div>
            </div>
            <div>
                <div>Books:</div>
                <div>{ data.bookCount }</div>
            </div>
            <Button
                label={ 'update' }
                func={ () => console.log('update author') }
            />
        </Content>
    )
}

export default Author