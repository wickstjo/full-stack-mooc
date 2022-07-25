import './ui/styles.scss'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetch_all } from './redux/anecdotes'

import Anecdotes from './components/list_anecdotes'
import CreateAnecdote from './components/create_anecdote'
import Filter from './components/filter'
import Notifications from './components/notifications'

const App = () => {

    const dispatch = useDispatch()
    
    // ON FIRST LOAD, FETCH ANECDOTES
    useEffect(() => {
        dispatch(fetch_all())
    }, [dispatch])

    return (
        <div id={ 'main' }>
            <Notifications />
            <CreateAnecdote />
            <Filter />
            <Anecdotes />
        </div>
    )
}

export default App