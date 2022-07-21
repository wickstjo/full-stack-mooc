import { FlatList } from 'react-native'
import { GET_REPOS } from '../gql/queries';
import useResource from '../hooks/resource'

import Scroller from '../components/scroller'
import Repo from '../components/repos/'
// import useField from '../hooks/field'

// import Filter from '../components/filter'
// <Filter field={ filter } />

export default () => {

    // PERFORM QUERY
    const [data, loading] = useResource({
        query: GET_REPOS,
        extract: (response) => {
            return response.repositories.edges.map(item => item.node)
        }
    })

    // // REPO FILTER
    // const filter = useField({
    //     placeholder: 'Filter by repository name'
    // })

    switch (loading) {

        // DONE LOADING
        case false: { return (
            <Scroller>
                <FlatList
                    data={ data }
                    renderItem={ Repo }
                />
            </Scroller>
        )}

        // STILL LOADING, RENDER NOTHING
        default: { return null }
    }
}