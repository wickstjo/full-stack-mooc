import ReactDOM from 'react-dom/client'
import App from './components/app'

// REDUX
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

// REDUCERS
import notifications from './reducers/notifications'
import prompts from './reducers/prompts'
import auth from './reducers/auth'

// CREATE REDUX REDUCER STORE
const store = configureStore({
    reducer: {
        notifications,
        prompts,
        auth
    }
})

// CREATE PROVIDER
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={ store }>
        <App />
    </Provider>
)