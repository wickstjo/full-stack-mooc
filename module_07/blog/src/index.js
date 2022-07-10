import ReactDOM from 'react-dom/client'
import App from './components/app'

// REDUX
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

// REDUCERS
import notifications from './reducers/notifications'
import auth from './reducers/auth'
import prompts from './reducers/prompts'

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

// CREATE PROVIDER
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={ store }>
        <App />
    </Provider>
)