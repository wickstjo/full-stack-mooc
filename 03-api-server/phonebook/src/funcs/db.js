import axios from 'axios'

// BASE URL FOR REQUESTS
const base_url = 'http://localhost:3001/persons';

// FETCH EXISTING PEOPLE FROM DB
const fetch_people = () => {
    return axios.get(base_url).then(response => {
        return response.data
    })
}

// CREATE NEW PERSON IN DB
const create_person = (payload) => {
    return axios.post(base_url, payload).then(response => {
        switch (response.status) {

            // ALL OK
            case 201: {
                return {
                    status: response.status,
                    id: response.data.id
                }
            }

            // FALLBACK
            default: {
                return {
                    status: response.status,
                }
            }
        }
    })
}

// REMOVE PERSON FROM DB
const remove_person = (person_id) => {

    // CONCAT THE BASE URL
    const url = base_url + '/' + person_id

    return axios.delete(url).then(response => {
        return response.status
    })
}

// REMOVE PERSON FROM DB
const update_person = (person_id, payload) => {

    // CONCAT THE BASE URL
    const url = base_url + '/' + person_id

    return axios.put(url, payload).then(response => {
        return response.status
    })
}

export {
    fetch_people,
    create_person,
    remove_person,
    update_person
}