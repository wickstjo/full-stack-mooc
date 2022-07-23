import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

export default ({ query, data_extract, page_extract=false, variables={} }) => {

    // PERFORM GQL QUERY
    const { data, loading, fetchMore, refetch } = useQuery(query, {
        // fetchPolicy: 'cache-and-network',
        // context,
        variables,
    })

    // RESOURCE CONTAINER
    const [resource, set_resource] = useState([])

    const fetch_more = () => {
        
        // EXTRACT PAGE BASE
        const base = page_extract(data)
    
        if (!(!loading && base.pageInfo.hasNextPage)) {
            return;
        }

        fetchMore({
            variables: {
                after: base.pageInfo.endCursor,
                ...variables,
            },
        })
    }

    // WHEN DONE LOADING, EXTRACT DATA
    useEffect(() => {
        if (!loading) {
            const dataset = data_extract(data)
            set_resource(dataset)
        }
    }, [loading, data])

    return [resource, loading, fetch_more, refetch]
}