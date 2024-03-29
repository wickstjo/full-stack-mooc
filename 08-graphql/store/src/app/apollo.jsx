import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client' 
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

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

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
})

const Apollo = ({ children }) => { return (
    <ApolloProvider client={ client }>
        { children }
    </ApolloProvider>
)}

export default Apollo