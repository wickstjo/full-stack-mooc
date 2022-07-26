import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import notifications from './notifications'
import prompts from './prompts'
import auth from './auth'
import data from './data'

const store = configureStore({
    reducer: {
        notifications,
        prompts,
        auth,
        data
    }
})

const Redux = ({ children }) => { return (
    <Provider store={ store }>
        { children }
    </Provider>
)}

export default Redux