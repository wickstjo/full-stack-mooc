import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { USER, BOOKS } from '../models'
import useExtract from '../hooks/extractor'

import { Button } from '../components/inputs'
import Wrapper from '../components/wrapper'
import Content from '../components/content'

const User = () => {

    // AUXILLARY
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const params = useParams()

    // APOLLO QUERY
    const [item, config] = useExtract(USER, {
        id: params.id
    })

    return (
        <Content payload={ config }>
            <Wrapper header={ `user ${ params.id }` }>
                <div>
                    <div>Username:</div>
                    <div>{ item.username }</div>
                </div>
                <div>
                    <div>Favorite Genre:</div>
                    <div>{ item.favoriteGenre }</div>
                </div>
                { auth.username === item.username ? 
                    <Button
                        label={ 'update' }
                        func={ () => {
                            dispatch({
                                type: 'prompts/open',
                                window: 'update_user',
                                genre: item.favoriteGenre,
                                id: params.id
                            })
                        }}
                    />
                : null }
            </Wrapper>
            { auth.username === item.username ? 
                <Recommended genre={ item.favoriteGenre } />
            : null }
        </Content>
    )
}

const Recommended = ({ genre }) => {

    // APOLLO QUERY
    const [data, config] = useExtract(BOOKS, {
        genre: genre
    })

    return (
        <Content payload={ config } header={ 'recommended books' }>
            { data.map(item =>
                <div key={ item.id }>
                    <div><Link to={ `/books/${ item.id }` }>{ item.title }</Link></div>
                    <div>{ item.published }</div>
                </div>
            )}
        </Content>
    )
}

export default User