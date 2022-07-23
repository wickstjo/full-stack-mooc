import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '../components/inputs'
import Content from '../components/content'

const Book = () => {

    // GLOBAL STATE
    const { auth, data } = useSelector(state => state)
    const dispatch = useDispatch()
    const params = useParams()

    // LOCAL STATE
    const book = data.books.find(book => book.id === params.id)
    const header = `Book ${ params.id }`
    const fallback = 'A book with this ID does not exist.'

    return (
        <Content payload={[ header, fallback, book ]}>
            <div>
                <div>Title:</div>
                <div>{ book?.title }</div>
            </div>
            <div>
                <div>Author:</div>
                <div><Link to={ `/authors/${ book?.author.id }` }>{ book?.author.name }</Link></div>
            </div>
            <div>
                <div>Published:</div>
                <div>{ book?.published }</div>
            </div>
            <div>
                <div>Genres:</div>
                <div>{ book?.genres.join(', ') }</div>
            </div>
            { auth.session ? 
                <Button
                    label={ 'update' }
                    func={() => {
                        dispatch({
                            type: 'prompts/open',
                            window: 'update_book',
                            book: book,
                            id: params.id
                        })
                    }}
                />
            : null }
        </Content>
    )
}

export default Book