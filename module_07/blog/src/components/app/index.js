import './general.scss'
import './innerbody.scss'
import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// MAIN COMPONENTS
import Menu from '../menu'
import Pages from './pages'
import Prompt from '../prompt'
import Notifications from '../notifications'

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