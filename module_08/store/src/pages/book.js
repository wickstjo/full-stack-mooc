import { useParams } from 'react-router-dom'
import useResource from '../hooks/resource'
import { throttle, list } from '../misc'

import { Button } from '../components/inputs'
import Content from '../components/content'

const Book = () => {

    // EXTRACT URL PARAMS
    const params = useParams()

    // EXTENDED APOLLO HOOK
    const [data, loading] = useResource({
        target: 'findBook',
        query: `query {
            findBook(id: "${ params.id }") {
                id
                title
                published
                author
                genres
            }
        }`
    })
    
    return (
        <Content params={{ data, loading }}>
            <div>
                <div>Title:</div>
                <div>{ throttle(data.title, 50) }</div>
            </div>
            <div>
                <div>Author:</div>
                <div>{ data.author }</div>
            </div>
            <div>
                <div>Published:</div>
                <div>{ data.published }</div>
            </div>
            <div>
                <div>Genres:</div>
                <div>{ list(data.genres) }</div>
            </div>
            <Button
                label={ 'update' }
                func={ () => console.log('update book') }
            />
        </Content>
    )
}

export default Book