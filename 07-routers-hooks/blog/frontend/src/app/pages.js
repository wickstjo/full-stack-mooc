import { Routes, Route, Navigate } from 'react-router-dom';

// BLOG PAGES
import Blogs from '../pages/blogs'
import Blog from '../pages/blog'

// USER PAGES
import Users from '../pages/users'
import User from '../pages/user'

// FALLBACK ERROR PAGE
import ErrorPage from '../pages/error'

const Pages = () => { return (
    <div id={ 'innerbody' }>
        <Routes>
            <Route exact path={ '/' } element={ <Navigate replace to={ '/blogs' } /> } />

            <Route exact path={ '/blogs' } element={ <Blogs /> } />
            <Route path={ '/blogs/:id' } element={ <Blog /> } />

            <Route exact path={ '/users' } element={ <Users /> } />
            <Route path={ '/users/:id' } element={ <User /> } />

            <Route path={ '/*' } element={ <ErrorPage /> } />
        </Routes>
    </div>
)}

export default Pages