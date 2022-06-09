import axios from 'axios'

// BASE URL FOR REQUESTS
const base_url = 'http://localhost:3001/api/persons';

// PROCESS REQUEST
const request = async(query) => {
    try {
        const response = await query;
        return resolve(response)

    } catch(error) {
        return {
            status: 500,
            payload: error
        }
    }
}

// RESOLVE RESPONSE
const resolve = (response) => {
    switch (response.status) {

        // ALL OK
        case 200: {
            return {
                status: response.status,
                payload: response.data
            }
        }

        // USER CREATED
        case 201: {
            return {
                status: response.status,
                payload: response.data
            }
        }

        // FALLBACK
        default: {
            console.log('WEIRD RESPONSE STATUS')
            return response
        }
    }
}

// FETCH EXISTING PEOPLE FROM DB
const fetch_people = async() => {
    const query = axios.get(base_url);
    const response = await request(query)

    return response
}

// CREATE NEW PERSON IN DB
const create_person = async(person) => {
    const query = axios.post(base_url, person);
    const response = await request(query)
    
    return response
}

// REMOVE PERSON FROM DB
const remove_person = async(person_id) => {

    // CONCAT THE BASE URL
    const url = base_url + '/' + person_id
    const query = axios.delete(url)
    const response = await request(query);

    return response
}

// REMOVE PERSON FROM DB
const update_person = (person_id, payload) => {

    // CONCAT THE BASE URL
    const url = base_url + '/' + person_id

    return axios.put(url, payload).then(response => {
        return resolve(response)
    })
}

export {
    fetch_people,
    create_person,
    remove_person,
    update_person
}