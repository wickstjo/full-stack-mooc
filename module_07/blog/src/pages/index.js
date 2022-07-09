import { Routes, Route, Navigate } from 'react-router-dom';

// BLOG PAGES
import Blogs from './blogs'
import Blog from './blog'

// USER PAGES
import Users from './users'
import User from './user'

// STANDALONE PAGES
import Login from './login'
import Register from './register'
import ErrorPage from './error'

export default () => {
    return (
        <div id={ 'content' }>
            <Routes>
                <Route exact path={ '/' } element={ <Navigate replace to={ '/blogs' } /> } />

                <Route exact path={ '/blogs' } element={ <Blogs /> } />
                <Route path={ '/blogs/:id' } element={ <Blog /> } />

                <Route exact path={ '/users' } element={ <Users /> } />
                <Route path={ '/users/:id' } element={ <User /> } />

                <Route exact path={ '/login' } element={ <Login /> } />
                <Route exact path={ '/register' } element={ <Register /> } />

                <Route path={ '/*' } element={ <ErrorPage /> } />
            </Routes>
        </div>
    )
}