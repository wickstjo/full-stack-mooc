import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import Constants from 'expo-constants';

const httpLink = createHttpLink({
    uri: Constants.manifest.extra.APOLLO_URI,
})

const createApolloClient = () => {
    return new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
    })
}

const apolloClient = createApolloClient()

export default ({ children }) => { return (
    <ApolloProvider client={ apolloClient }>
        { children }
    </ApolloProvider>
)}