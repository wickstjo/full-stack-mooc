import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

const useExtract = (query, vars={}) => {

    // RESOURCE STATE
    const [resource, set_resource] = useState([])

    // APOLLO HOOK
    const result = useQuery(query.query, {
        variables: {
            ...vars
        }
    })

    // CHECK WHEN RESULT IS READY
    useEffect(() => {
        if (!result.loading && result.data[query.key]) {
            set_resource(result.data[query.key])
        }
    }, [result])

    return [resource, {
        query,
        result
    }]
}

export default useExtract