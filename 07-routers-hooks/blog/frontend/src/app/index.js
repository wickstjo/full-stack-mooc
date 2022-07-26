import './general.scss'
import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Pages from './pages'
import Menu from '../components/menu'
import Prompt from '../components/prompt'
import Notifications from '../components/notifications'

const App = () => {

    // REDUX DISPATCH
    const prompt = useSelector(state => state.prompts)
    const dispatch = useDispatch()

    // ON LOAD, CHECK LOCALSTORAGE FOR CREDENTIALS
    useEffect(() => {
        dispatch({
            type: 'auth/check'
        })
    }, [dispatch])

    return (
        <BrowserRouter>
            <div id={ 'main' } className={ prompt ? 'blurred' : null }>
                <Menu />
                <Pages />
            </div>
            <Prompt />
            <Notifications />
        </BrowserRouter>
    )
}

export default App