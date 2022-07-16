import { Fragment } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '../components/inputs'
import Content from '../components/content'

const User = () => {

    // AUXILLARY
    const { auth, data } = useSelector(state => state)
    const dispatch = useDispatch()
    const params = useParams()

    // USER STUFF
    const user = data.users.find(user => user.id === params.id)
    const user_header = `User ${ params.id }`
    const user_fallback = 'A user with this ID does not exist.'

    // RECOMMENDED STUFF
    const recommended = data.books.filter(book => book.genres.includes(user?.favoriteGenre))
    const recommended_header = 'recommended books'
    const recommended_fallback = 'There are no books fitting the selected genre.'

    return (
        <Fragment>
            <Content payload={[ user_header, user_fallback, user ]}>
                <div>
                    <div>Username:</div>
                    <div>{ user?.username }</div>
                </div>
                <div>
                    <div>Favorite Genre:</div>
                    <div>{ user?.favoriteGenre }</div>
                </div>
                { auth.username === user?.username ? 
                    <Button
                        label={ 'update' }
                        func={ () => {
                            dispatch({
                                type: 'prompts/open',
                                window: 'update_user',
                                genre: user.favoriteGenre,
                                id: params.id
                            })
                        }}
                    />
                : null }
            </Content>
            { user ?
                <Content payload={[ recommended_header, recommended_fallback, recommended ]}>
                    { recommended.map(item =>
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

export default User