import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

// REDUCERS
import auth from './auth'
import notifications from './notifications'

// CREATE REDUX REDUCER STORE
const store = configureStore({
    reducer: {
        auth,
        notifications,
    }
})

export default ({ children }) => { return (
    <Provider store={ store }>
        { children }
    </Provider>
)}