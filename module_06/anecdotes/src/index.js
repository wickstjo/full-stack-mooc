import ReactDOM from 'react-dom/client'
import App from './app'

// REDUX
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

// REDUCERS
import anecdotes from './reducers/anecdotes'
import notifications from './reducers/notifications'
import filter from './reducers/filter'

// CREATE REDUX REDUCER STORE
const store = configureStore({
    reducer: {
        anecdotes,
        notifications,
        filter
    }
})

// CREATE PROVIDER
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={ store }>
        <App />
    </Provider>
)