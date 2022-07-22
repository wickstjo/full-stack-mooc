import { FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { GET_REPOS } from '../gql/queries';
import useResource from '../hooks/resource'
import { apply_filter } from '../funcs/misc';

import Scroller from '../components/scroller'
import Sorting from '../components/sorting'
import Repo from '../components/repos/'

export default () => {

    // FILTER RESULTS
    const filter = useSelector(state => state.filter)

    // PERFORM QUERY
    const [data, loading, fetch_more] = useResource({
        query: GET_REPOS,
        variables: {
            first: 8
        },
        data_extract: (response) => {
            return response.repositories.edges.map(item => item.node)
        },
        page_extract: (response) => {
            return response.repositories
        }
    })

    switch (loading) {

        // DONE LOADING
        case false: { return (
            <Scroller>
                <Sorting />
                <FlatList
                    data={ apply_filter(data, filter) }
                    renderItem={ Repo }
                    onEndReached={ fetch_more }
                    onEndReachedThreshold={ 0.5 }
                />
            </Scroller>
        )}

        // STILL LOADING, RENDER NOTHING
        default: { return null }
    }
}