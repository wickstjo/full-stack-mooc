import './general.scss'
import { Routes, Route, Navigate } from 'react-router-dom';

import Books from '../../pages/books'
import Book from '../../pages/book'

import Authors from '../../pages/authors'
import Author from '../../pages/author'

import Users from '../../pages/users'
import User from '../../pages/user'

import ErrorPage from '../../pages/error'

const Pages = () => { return (
    <div id={ 'innerbody' }>
        <Routes>
            <Route exact path={ '/' } element={ <Navigate replace to={ '/books' } /> } />

            <Route exact path={ '/books' } element={ <Books /> } />
            <Route path={ '/books/:id' } element={ <Book /> } />

            <Route exact path={ '/authors' } element={ <Authors /> } />
            <Route path={ '/authors/:id' } element={ <Author /> } />

            <Route exact path={ '/users' } element={ <Users /> } />
            <Route path={ '/user/:id' } element={ <User /> } />

            <Route path={ '/*' } element={ <ErrorPage /> } />
        </Routes>
    </div>
)}

export default Pages