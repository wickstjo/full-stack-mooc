import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { useQuery } from '@apollo/client'
import { BOOKS } from '../gql/book'
import { AUTHORS } from '../gql/author'
import { USERS } from '../gql/user'

import Pages from './pages'
import Menu from '../components/menu'
import Notifications from '../components/notifications'
import Prompt from '../components/prompt'

const App = () => {

    // AUXILLARY
    const { prompts, data } = useSelector(state => state)
    const dispatch = useDispatch()

    // API CALLS
    const books = useQuery(BOOKS.query)
    const authors = useQuery(AUTHORS.query)
    const users = useQuery(USERS.query)

    // CHECK LOCALSTORAGE FOR CREDENTIALS
    useEffect(() => {
        dispatch({
            type: 'auth/check'
        })
    }, [dispatch])

    // CHECK IF ALL DATA HAS BEEN LOADED
    useEffect(() => {
        if (!books.loading && !authors.loading && !users.loading) {
            if (books.data[BOOKS.key] && authors.data[AUTHORS.key] && users.data[USERS.key]) {
                setTimeout(() => {
                    dispatch({
                        type: 'data/init',
                        books: books.data[BOOKS.key],
                        authors: authors.data[AUTHORS.key],
                        users: users.data[USERS.key]
                    })
                }, 1000)
            }
        }
    }, [books, authors, users, dispatch])

    switch (data.loading) {

        // LOADING DATA
        case true: { return (
            <div id={ 'loading' }>
                <div className={ 'lds-dual-ring' } />
            </div>
        )}

        // RENDER NORMALLY
        default: { return (
            <BrowserRouter>
                <div id={ 'main' } className={ prompts ? 'blurred' : null }>
                    <Menu />
                    <Pages />
                </div>
                <Prompt />
                <Notifications />
            </BrowserRouter>
        )}
    }
}

export default App