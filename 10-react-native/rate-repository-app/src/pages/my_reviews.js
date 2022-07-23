import { FlatList } from 'react-native'
import { MY_REVIEWS } from '../gql/queries';
import useResource from '../hooks/resource'

import Scroller from '../components/scroller'
import Review from '../components/reviews'

export default () => {

    // PERFORM QUERY
    const [data, loading, _, refetch ] = useResource({
        query: MY_REVIEWS,
        variables: {
            includeReviews: true
        },
        data_extract: (response) => {
            return response.me.reviews.edges.map(item => item.node)
        },
    })

    switch (loading) {

        // DONE LOADING
        case false: { return (
            <Scroller>
                <FlatList
                    data={ data }
                    renderItem={ ({ item }) =>
                        <Review
                            item={ item }
                            refetch={ refetch }
                        />
                    }
                />
            </Scroller>
        )}

        // STILL LOADING, RENDER NOTHING
        default: { return null }
    }
}