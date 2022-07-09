import axios from 'axios'

// BASE URL FOR REQUESTS
const base_url = 'http://localhost:3001/api/users'
const login_url = 'http://localhost:3001/api/login'

// QUERY WRAPPER
const wrapper = async (query) => {
    try {
        return await query
    } catch (error) {
        return error.response
    }
}

// FETCH ALL USERS
const fetch_all = async() => {
    const query = axios.get(base_url)
    return wrapper(query)
}


// FETCH SPECIFIC USER
const fetch_specific = async(id) => {
    const target = `${ base_url }/${ id }`
    const query = axios.get(target)
    return wrapper(query)
}


// CREATE NEW PERSON IN DB
const create = async (params) => {
    const query = axios.post(base_url, params)
    return wrapper(query)
}

// LOGIN EXISTING USER
const login = async (params) => {
    const query = axios.post(login_url, params)
    return wrapper(query)
}

export {
    fetch_all,
    fetch_specific,
    create,
    login
}