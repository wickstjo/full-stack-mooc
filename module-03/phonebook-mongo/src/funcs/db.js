import axios from 'axios'

// BASE URL FOR REQUESTS
const base_url = 'http://localhost:3001/api/persons';

// FETCH EXISTING PEOPLE FROM DB
const fetch_people = () => {
    return axios.get(base_url).then(response => {
        return response
    }).catch(error => {
        return {
            status: 500,
            data: error
        }
    })
}

// CREATE NEW PERSON IN DB
const create_person = (person) => {
    return axios.post(base_url, person).then(response => {
        return response
    }).catch(error => {
        return {
            status: 500,
            data: error
        }
    })
}

// // REMOVE PERSON FROM DB
// const remove_person = async(person_id) => {

//     // CONCAT THE BASE URL
//     const url = base_url + '/' + person_id
//     const query = axios.delete(url)
//     const response = await request(query);

//     return response
// }

// // REMOVE PERSON FROM DB
// const update_person = (person_id, payload) => {

//     // CONCAT THE BASE URL
//     const url = base_url + '/' + person_id

//     return axios.put(url, payload).then(response => {
//         return resolve(response)
//     })
// }

export {
    fetch_people,
    create_person,
}