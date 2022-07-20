import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

export default ({ query, extract }) => {

    // PERFORM GQL QUERY
    const { data, error, loading } = useQuery(query, {
        fetchPolicy: 'cache-and-network',
    })
    
    // RESOURCE CONTAINER
    const [resource, set_resource] = useState([])

    // WHEN DONE LOADING, EXTRACT DATA
    useEffect(() => {
        if (!loading) {
            const dataset = extract(data)
            set_resource(dataset)
        }
    }, [loading])

    return [resource, loading]
}