import { FlatList } from 'react-native'

import { GET_REPOS } from '../gql/queries';
import useResource from '../hooks/resource'

import Scroller from '../components/scroller'
import Container from '../components/container'
import Details from '../components/repos/details'
import Ratings from '../components/repos/ratings'
import Filter from '../components/filter'
import useField from '../hooks/field'

export default () => {

    // PERFORM QUERY
    const [data, loading] = useResource({
        query: GET_REPOS,
        extract: (response) => {
            return response.repositories.edges.map(item => item.node)
        }
    })

    // REPO FILTER
    const filter = useField({
        placeholder: 'Filter by repository name'
    })

    switch (loading) {

        // DONE LOADING
        case false: { return (
            <Scroller>
                <Filter field={ filter } />
                <FlatList
                    data={ data }
                    renderItem={ Item }
                />
            </Scroller>
        )}

        // STILL LOADING, RENDER NOTHING
        default: { return null }
    }
}

const Item = ({ item }) => { return (
    <Container>
        <Details
            img={ item.ownerAvatarUrl }
            user={ item.fullName }
            lang={ item.language }
        />
        <Ratings item={ item } />
    </Container>
)};