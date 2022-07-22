import { FlatList } from 'react-native'
import { GET_REPO } from '../gql/queries'
import useResource from '../hooks/resource'
import { useParams } from 'react-router-native'

import Scroller from '../components/scroller'
import Repo from '../components/repos/'
import Review from '../components/reviews/'

export default () => {

    // EXTRACT ID FROM URL
    const params = useParams()

    // PERFORM QUERY
    const [data, loading, fetch_more] = useResource({
        query: GET_REPO,
        variables: {
            id: params.id,
            first: 5
        },
        data_extract: (response) => { return {
            ...response.repository,
            id: params.id,
            reviews: response.repository.reviews?.edges.map(item => item.node)
        }},
        page_extract: (response) => {
            return response.repository.reviews
        }
    })

    switch (loading) {

        // DONE LOADING
        case false: { return (
            <Scroller>
                <Repo
                    item={ data }
                    github={ true }
                />
                <FlatList
                    data={ data.reviews }
                    renderItem={ Review }
                    onEndReached={ fetch_more }
                    onEndReachedThreshold={ 0.5 }
                />
            </Scroller>
        )}

        // STILL LOADING, RENDER NOTHING
        default: { return null }
    }
}