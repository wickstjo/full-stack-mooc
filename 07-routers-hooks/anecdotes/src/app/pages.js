import './general.scss'
import { Routes, Route, Navigate } from 'react-router-dom';

// BLOG PAGES
import Anecdotes from '../pages/anecdotes'
import Anecdote from '../pages/anecdote'
import Create from '../pages/create'
import About from '../pages/about'
import ErrorPage from '../pages/error'

const Pages = () => { return (
    <div id={ 'innerbody' }>
        <Routes>
            <Route exact path={ '/' } element={ <Navigate replace to={ '/anecdotes' } /> } />

            <Route exact path={ '/anecdotes' } element={ <Anecdotes /> } />
            <Route path={ '/anecdotes/:id' } element={ <Anecdote /> } />
            <Route exact path={ '/create' } element={ <Create /> } />
            <Route exact path={ '/about' } element={ <About /> } />

            <Route path={ '/*' } element={ <ErrorPage /> } />
        </Routes>
    </div>
)}

export default Pages