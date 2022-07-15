import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AUTHOR, BOOKS } from '../models'
import useExtract from '../hooks/extractor'

import { Button } from '../components/inputs'
import Wrapper from '../components/wrapper'
import Content from '../components/content'

const Author = () => {

    // AUXILLARY
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const params = useParams()

    // APOLLO QUERY
    const [item, config] = useExtract(AUTHOR, {
        id: params.id
    })

    return (
        <Content payload={ config }>
            <Wrapper header={ `author ${ params.id }` }>
                <div>
                    <div>Name:</div>
                    <div>{ item.name }</div>
                </div>
                { item.born ?
                    <div>
                        <div>Born:</div>
                        <div>{ item.born }</div>
                    </div>
                : null }
                { auth.session ? 
                    <Button
                        label={ 'update' }
                        func={() => {
                            dispatch({
                                type: 'prompts/open',
                                window: 'update_author',
                                author: item,
                                id: params.id
                            })
                        }}
                    />
                : null }
            </Wrapper>
            <Books name={ item.name } />
        </Content>
    )
}

const Books = ({ name }) => {

    // APOLLO QUERY
    const [data, config] = useExtract(BOOKS, {
        author: name
    })

    return (
        <Content payload={ config } header={ 'authored books' }>
            { data.map(item =>
                <div key={ item.id }>
                    <div><Link to={ `/books/${ item.id }` }>{ item.title }</Link></div>
                    <div>{ item.published }</div>
                </div>
            )}
        </Content>
    )
}

export default Author