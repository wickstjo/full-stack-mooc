import ReactDOM from 'react-dom/client'
import App from './components/app'

// REDUX
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

// REDUCERS
import anecdotes from './reducers/anecdote_reducer'
import notifications from './reducers/notification_reducer'
import filter from './reducers/filter_reducer'

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