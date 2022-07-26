import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

// REDUCERS
import anecdotes from './anecdotes'
import notifications from './notifications'
import filter from './filter'

// CREATE REDUX REDUCER STORE
const store = configureStore({
    reducer: {
        anecdotes,
        notifications,
        filter
    }
})

const Redux = ({ children }) => { return (
    <Provider store={ store }>
        { children }
    </Provider>
)}

export default Redux