import ReactDOM from 'react-dom/client'
import App from './components/app'

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client' 
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

// REDUX
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

// REDUCERS
import notifications from './redux/notifications'
import prompts from './redux/prompts'
import auth from './redux/auth'
import data from './redux/data'

// CREATE REDUX REDUCER STORE
const store = configureStore({
    reducer: {
        notifications,
        prompts,
        auth,
        data
    }
})

const httpLink = new HttpLink({
    uri: 'http://localhost:4000',
})

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: {
        reconnect: true
    }
})
  
const splitLink = split(({ query }) => {
    const definition = getMainDefinition(query)
    return (
        definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    )
}, wsLink, httpLink)


// GQL APOLLO CLIENT
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
})

// CREATE PROVIDER
ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={ client }>
        <Provider store={ store }>
            <App />
        </Provider>
    </ApolloProvider>
)