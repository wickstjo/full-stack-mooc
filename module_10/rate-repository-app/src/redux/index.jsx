import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

// REDUCERS
import auth from './auth'
import notifications from './notifications'
import prompts from './prompts'
import filter from './filter'

// CREATE REDUX REDUCER STORE
const store = configureStore({
    reducer: {
        auth,
        notifications,
        prompts,
        filter,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export default ({ children }) => { return (
    <Provider store={ store }>
        { children }
    </Provider>
)}