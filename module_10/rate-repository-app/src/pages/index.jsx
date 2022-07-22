import { Route, Routes, Navigate } from 'react-router-native';

import Repositories from './repositories'
import Repository from './repository'
import Error from './error'

import Reviews from './my_reviews'

export default () => { return (
    <Routes>
        <Route exact path={ '/' } element={ <Navigate to={ '/repos' } replace /> } />
        <Route path={ '/repos' } element={ <Repositories /> } />
        <Route path={ '/repos/:id' } element={ <Repository /> } />
        <Route path={ '/reviews' } element={ <Reviews /> } />
        <Route path={ '*' } element={ <Error /> } />
    </Routes>
)}