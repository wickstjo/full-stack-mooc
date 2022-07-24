import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

// REDUCERS
import notifications from './notifications'

// CREATE REDUX REDUCER STORE
const store = configureStore({
    reducer: {
        notifications,
    },
})

const Redux = ({ children }) => { return (
    <Provider store={ store }>
        { children }
    </Provider>
)}

export default Redux