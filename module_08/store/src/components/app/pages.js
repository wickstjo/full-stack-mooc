import './general.scss'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import { useSubscription } from '@apollo/client'

import { ADDED_FEED as BOOK_ADD, UPDATED_FEED as BOOK_UPD } from '../../gql/book'
import { ADDED_FEED as AUTHOR_ADD, UPDATED_FEED as AUTHOR_UPD } from '../../gql/author'
import { ADDED_FEED as USER_ADD, UPDATED_FEED as USER_UPD } from '../../gql/user'

import Books from '../../pages/books'
import Book from '../../pages/book'
import Authors from '../../pages/authors'
import Author from '../../pages/author'
import Users from '../../pages/users'
import User from '../../pages/user'
import ErrorPage from '../../pages/error'

const Pages = () => {

    // AUXILLARY
    const dispatch = useDispatch()

    // BOOK ADDED
    useSubscription(BOOK_ADD.query, {
        onSubscriptionData: ({ subscriptionData }) => {
            // console.log('ADDED BOOK', subscriptionData)

            // PUSH TO STATE
            dispatch({
                type: 'data/add_book',
                book: subscriptionData.data[BOOK_ADD.key]
            })

            // PUSH NOTIFICATION
            dispatch({
                type: 'notifications/neutral',
                message: 'A new book was just added!'
            })
        }
    })

    // BOOK UPDATED
    useSubscription(BOOK_UPD.query, {
        onSubscriptionData: ({ subscriptionData }) => {
            console.log('UPDATED BOOK', subscriptionData)

            // PUSH TO STATE
            dispatch({
                type: 'data/upd_book',
                book: subscriptionData.data[BOOK_UPD.key]
            })

            // PUSH NOTIFICATION
            dispatch({
                type: 'notifications/neutral',
                message: 'A book was just updated!'
            })
        }
    })

    // AUTHOR ADDED
    useSubscription(AUTHOR_ADD.query, {
        onSubscriptionData: ({ subscriptionData }) => {
            // console.log('ADDED AUTHOR', subscriptionData)

            // PUSH TO STATE
            dispatch({
                type: 'data/add_author',
                author: subscriptionData.data[AUTHOR_ADD.key]
            })

            // PUSH NOTIFICATION
            dispatch({
                type: 'notifications/neutral',
                message: 'A new author was just added!'
            })
        }
    })

    // AUTHOR UPDATED
    useSubscription(AUTHOR_UPD.query, {
        onSubscriptionData: ({ subscriptionData }) => {
            // console.log('ADDED BOOK', subscriptionData)

            // PUSH TO STATE
            dispatch({
                type: 'data/upd_author',
                author: subscriptionData.data[AUTHOR_UPD.key]
            })

            // PUSH NOTIFICATION
            dispatch({
                type: 'notifications/neutral',
                message: 'An author was just updated'
            })
        }
    })

    // USER ADDED
    useSubscription(USER_ADD.query, {
        onSubscriptionData: ({ subscriptionData }) => {
            // console.log('ADDED USER')

            // PUSH TO STATE
            dispatch({
                type: 'data/add_user',
                user: subscriptionData.data[USER_ADD.key]
            })

            // PUSH NOTIFICATION
            dispatch({
                type: 'notifications/neutral',
                message: 'A new user just joined!'
            })
        }
    })

    // USER UPDATED
    useSubscription(USER_UPD.query, {
        onSubscriptionData: ({ subscriptionData }) => {
            // console.log('ADDED BOOK', subscriptionData)

            // PUSH TO STATE
            dispatch({
                type: 'data/upd_user',
                user: subscriptionData.data[USER_UPD.key]
            })

            // PUSH NOTIFICATION
            dispatch({
                type: 'notifications/neutral',
                message: 'A user was just updated'
            })
        }
    })
    
    return (
        <div id={ 'innerbody' }>
            <Routes>
                <Route exact path={ '/' } element={ <Navigate replace to={ '/books' } /> } />

                <Route exact path={ '/books' } element={ <Books /> } />
                <Route path={ '/books/:id' } element={ <Book /> } />

                <Route exact path={ '/authors' } element={ <Authors /> } />
                <Route path={ '/authors/:id' } element={ <Author /> } />

                <Route exact path={ '/users' } element={ <Users /> } />
                <Route path={ '/users/:id' } element={ <User /> } />

                <Route path={ '/*' } element={ <ErrorPage /> } />
            </Routes>
        </div>
    )
}

export default Pages