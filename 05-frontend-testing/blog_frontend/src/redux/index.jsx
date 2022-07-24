import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

// REDUCERS
import notifications from './notifications'
import prompts from './prompts'
import auth from './auth'
import resources from './resources'

// CREATE REDUX REDUCER STORE
const store = configureStore({
    reducer: {
        notifications,
        prompts,
        auth,
        resources
    },
})

const Redux = ({ children }) => { return (
    <Provider store={ store }>
        { children }
    </Provider>
)}

export default Redux