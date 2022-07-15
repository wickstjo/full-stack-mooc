import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BOOK } from '../models'
import useExtract from '../hooks/extractor'

import { Button } from '../components/inputs'
import Wrapper from '../components/wrapper'
import Content from '../components/content'

const Book = () => {

    // AUXILLARY
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const params = useParams()

    // APOLLO QUERY
    const [data, config] = useExtract(BOOK, {
        id: params.id
    })

    return (
        <Content payload={ config }>
            <Wrapper header={ `book ${ params.id }` }>
                <div>
                    <div>Title:</div>
                    <div>{ data.title }</div>
                </div>
                <div>
                    <div>Author:</div>
                    <div><Link to={ `/authors/${ data.author?.id }` }>{ data.author?.name }</Link></div>
                </div>
                <div>
                    <div>Published:</div>
                    <div>{ data.published }</div>
                </div>
                <div>
                    <div>Genres:</div>
                    <div>{ data.genres?.join(', ') }</div>
                </div>
                { auth.session ? 
                    <Button
                        label={ 'update' }
                        func={() => {
                            dispatch({
                                type: 'prompts/open',
                                window: 'update_book',
                                book: data,
                                id: params.id
                            })
                        }}
                    />
                : null }
            </Wrapper>
        </Content>
    )
}

export default Book