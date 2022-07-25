import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { reducer as anecdotes } from './anecdotes'
import { reducer as notifications } from './notifications'
import { reducer as filter } from './filter'

const store = configureStore({
    reducer: {
        anecdotes,
        notifications,
        filter,
    }
})

const Redux = ({ children }) => { return (
    <Provider store={ store }>
        { children }
    </Provider>
)}

export default Redux