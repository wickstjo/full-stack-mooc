import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import notifications from './notifications'
import auth from './auth'
import prompts from './prompts'

// CREATE REDUX REDUCER STORE
const store = configureStore({
    reducer: {
        notifications,
        auth,
        prompts,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

const Redux = ({ children }) => { return (
    <Provider store={ store }>
        { children }
    </Provider>
)}

export default Redux