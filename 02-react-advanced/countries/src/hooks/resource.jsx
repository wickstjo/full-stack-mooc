import { useState, useEffect } from 'react'
import axios from 'axios'

const useResource = ({ url, extract=false }) => {

    // RESOURCE CONTAINER
    const [resource, set_resource] = useState([])

    // ON LOAD, FETCH DATA FROM API
    useEffect(() => {
        axios.get(url).then(response => {

            // CATCH ODD RESPONSES
            if (response.status !== 200) {
                return console.log('COULD NOT FETCH RESOURCE')
            }

            // TARGET PAYLOAD
            let payload = response.data

            // USE EXTRACTOR WHEN ONE IS PROVIDED
            if (extract) {
                payload = extract(response.data)
            }

            set_resource(payload)

        // CATCH AXIOS ERRORS
        }).catch(error => {
            console.log(error.message)
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])

    // ADD ENTRY TO STATE
    const create = async (payload) => {

        // PUSH ENTRY TO DB
        const response = await axios.post(url, payload)

        // CATCH UNEXPECTED STATUSES
        if (response.status !== 201) {
            return console.log(`COULD NOT ADD ENTRY TO DB (${ response.status })`)
        }

        // PUSH TO STATE
        set_resource([
            ...resource,
            response.data
        ])
    }

    // UPDATE ENTRY IN STATE
    const update = async (id, payload) => {

        // PUSH ENTRY TO DB
        const adjusted_url = `${ url }/${ id }`
        const response = await axios.put(adjusted_url, payload)
        
        // CATCH UNEXPECTED STATUSES
        if (response.status !== 201) {
            return console.log(`COULD NOT UPDATE ENTRY IN DB (${ response.status })`)
        }

        // FIND & MODIFY THE ENTRY
        const cloned = [...resource]
        const target = resource.findIndex(entry => entry.id === id)
        cloned[target] = payload

        // UPDATE STATE
        set_resource(cloned)
    }
    
    // REMOVE ENTRY FROM STATE
    const remove = async (id) => {
        
        // PUSH ENTRY TO DB
        const adjusted_url = `${ url }/${ id }`
        const response = await axios.post(adjusted_url)

        // CATCH UNEXPECTED STATUSES
        if (response.status !== 204) {
            return console.log(`COULD NOT REMOVE ENTRY FROM DB (${ response.status })`)
        }

        // UPDATE STATE
        const cloned = [...resource].filter(entry => entry.id === id)
        set_resource(cloned)
    }


    return [resource, {
        create,
        update,
        remove
    }]
}

export default useResource