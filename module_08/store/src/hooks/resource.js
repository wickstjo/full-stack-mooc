import { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'

const useResource = ({ target, query }) => {

    // RESOURCE STATE
    const [resource, set_resource] = useState([])

    // FETCH RESOURCE
    const result = useQuery(gql(query))

    useEffect(() => {
        if (result.data && result.data[target]) {
            set_resource(result.data[target])
        }
    }, [result])

    return [resource, result.loading]
}

export default useResource