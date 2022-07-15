import { useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { throttle } from '../misc'

import { one_book } from '../models'
import { useQuery } from '@apollo/client'

import { Button } from '../components/inputs'
import Wrapper from '../components/wrapper'

const Book = () => {

    // AUXILLARY
    const dispatch = useDispatch()
    const params = useParams()
    const target = 'findBook'

    // APOLLO HOOK
    const result = useQuery(one_book(params.id))

    // OPEN PROMPT WINDOW
    const update = () => {
        dispatch({
            type: 'prompts/update_book',
            book: result.data[target],
            id: params.id
        })
    }

    // DONE LOADING
    if (!result.loading && result.data[target]) { return (
        <Wrapper header={ 'book' }>
            <div>
                <div>Title:</div>
                <div>{ throttle(result.data[target].title, 50) }</div>
            </div>
            <div>
                <div>Author:</div>
                <div><Link to={ `/authors/${ result.data[target].author.id }` }>{ result.data[target].author.name }</Link></div>
            </div>
            <div>
                <div>Published:</div>
                <div>{ result.data[target].published }</div>
            </div>
            <div>
                <div>Genres:</div>
                <div>{ result.data[target].genres.join(', ') }</div>
            </div>
            <Button
                label={ 'update' }
                func={ update }
            />
        </Wrapper>
    )}

    // FALLBACK
    return (
        <Wrapper header={ 'error' }>
            <div>Data could not be retrieved.</div>
        </Wrapper>
    )
}

export default Book