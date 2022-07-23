import ReactDOM from 'react-dom/client'
import App from './components/app'

// REDUX
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

// REDUCERS
import notifications from './redux/notifications'
import auth from './redux/auth'
import prompts from './redux/prompts'

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