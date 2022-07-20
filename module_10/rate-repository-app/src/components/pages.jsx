import { Route, Routes, Navigate } from 'react-router-native';

import Repositories from '../pages/repositories'
import Reviews from '../pages/reviews'
import Login from '../pages/login'
import Error from '../pages/error'

export default () => { return (
    <Routes>
        <Route exact path={ '/' } element={ <Navigate to={ '/repos' } replace /> } />
        <Route path={ '/repos' } element={ <Repositories /> } />
        <Route path={ '/reviews' } element={ <Reviews /> } />
        <Route path={ '/login' } element={ <Login /> } />
        <Route path={ '*' } element={ <Error /> } />
    </Routes>
)}