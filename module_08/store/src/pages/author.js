import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Fragment } from 'react'

import { Button } from '../components/inputs'
import Content from '../components/content'

const Author = () => {

    // AUXILLARY
    const { auth, data } = useSelector(state => state)
    const dispatch = useDispatch()
    const params = useParams()

    // AUTHOR STUFF
    const author = data.authors.find(author => author.id === params.id)
    const author_header = `Author ${ params.id }`
    const author_fallback = 'An author with this ID does not exist.'

    // AUTHORED BOOKS STUFF
    const books_header = `Authored books (${ author?.books.length })`
    const books_fallback = 'This author has not published any books.'

    return (
        <Fragment>
            <Content payload={[ author_header, author_fallback, author ]}>
                <div>
                    <div>Name:</div>
                    <div>{ author?.name }</div>
                </div>
                { author?.born ?
                    <div>
                        <div>Born:</div>
                        <div>{ author.born }</div>
                    </div>
                : null }
                { auth.session ? 
                    <Button
                        label={ 'update' }
                        func={() => {
                            dispatch({
                                type: 'prompts/open',
                                window: 'update_author',
                                author: author,
                                id: params.id
                            })
                        }}
                    />
                : null }
            </Content>
            { author ?
                <Content payload={[ books_header, books_fallback, author.books ]}>
                    { author.books.map(item =>
                        <div key={ item.id }>
                            <div><Link to={ `/books/${ item.id }` }>{ item.title }</Link></div>
                            <div>{ item.published }</div>
                        </div>
                    )}
                </Content>
            : null}
        </Fragment>
    )
}

export default Author