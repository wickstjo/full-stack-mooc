import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

// REDUCERS
import auth from './auth'
import notifications from './notifications'
import prompts from './prompts'

// CREATE REDUX REDUCER STORE
const store = configureStore({
    reducer: {
        auth,
        notifications,
        prompts
    }
})

export default ({ children }) => { return (
    <Provider store={ store }>
        { children }
    </Provider>
)}