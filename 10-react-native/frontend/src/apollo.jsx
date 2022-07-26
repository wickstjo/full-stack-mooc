import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context'
import { useSelector } from 'react-redux'
import Constants from 'expo-constants'
import fetch from 'cross-fetch'

const httpLink = createHttpLink({
    uri: Constants.manifest.extra.APOLLO_URI,
    fetch
})

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                repositories: relayStylePagination(),
            },
        },
        Repository: {
            fields: {
                reviews: relayStylePagination(),
            },
        },
    },
})

const authLink = (token) => {
    return setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${ token }`
            },
        }
    })
}

const createApolloClient = (token) => {
    return new ApolloClient({
        link: authLink(token).concat(httpLink),
        cache
    })
}

export default ({ children }) => {

    // UPDATE APOLLO CLIENT WITH AUTH STATE
    const auth = useSelector(state => state.auth)
    const token = auth.session ? auth.token : ''
    
    return (
        <ApolloProvider client={ createApolloClient(token) }>
            { children }
        </ApolloProvider>
    )
}