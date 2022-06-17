import axios from 'axios'

// BASE URL FOR REQUESTS
const base_url = 'http://localhost:3001/api/blogs';

// QUERY WRAPPER
const wrapper = async (query) => {
    try {
        return await query
    } catch (error) {
        return error.response
    }
}

// FETCH ALL BLOGS
const fetch_all = async() => {
    const query = axios.get(base_url)
    return wrapper(query)
}

// CREATE NEW PERSON IN DB
const create_blog = async(params, token) => {
    const query = axios.post(base_url, params, {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    })
    return wrapper(query)
}

// REMOVE BLOG
const remove_blog = async (id, token) => {
    const target = `${ base_url }/${ id }`

    const query = axios.delete(target, {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    })

    return wrapper(query)
}

export {
    fetch_all,
    create_blog,
    remove_blog
}

// // SHARED WRAPPER FUNC
// const wrapper = (query) => {
//     return query.then(response => {
//         return response
//     }).catch(error => {
//         return error.response
//     })
// }

// // FETCH EXISTING PEOPLE FROM DB
// const fetch_people = () => {
//     const query = axios.get(base_url)
//     return wrapper(query)
// }

// // CREATE NEW PERSON IN DB
// const create_person = (person) => {
//     const query = axios.post(base_url, person)
//     return wrapper(query)
// }

// // REMOVE PERSON FROM DB
// const remove_person = (person_id) => {

//     // CONCAT THE BASE URL
//     const url = `${ base_url }/${ person_id }`
//     const query = axios.delete(url)

//     return wrapper(query)
// }

// // UPDATE EXISTING PERSON
// const update_person = (person_id, person) => {

//     // CONCAT THE BASE URL
//     const url = `${ base_url }/${ person_id }`
//     const query = axios.put(url, person)
    
//     return wrapper(query)
// }