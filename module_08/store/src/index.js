import ReactDOM from 'react-dom/client'
import App from './components/app'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client' 

// REDUX
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

// REDUCERS
import anecdotes from './redux/anecdotes'
import filter from './redux/filter'
import notifications from './redux/notifications'
import prompts from './redux/prompts'

// CREATE REDUX REDUCER STORE
const store = configureStore({
    reducer: {
        anecdotes,
        notifications,
        prompts,
        filter,
    }
})

// GQL APOLLO CLIENT
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:4000',
    })
})

// CREATE PROVIDER
ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={ client }>
        <Provider store={ store }>
            <App />
        </Provider>
    </ApolloProvider>
)