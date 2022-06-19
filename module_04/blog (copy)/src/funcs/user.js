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

// CREATE NEW PERSON IN DB
const create_user = async (params) => {
    const query = axios.post(base_url, params)
    return wrapper(query)
}

// LOGIN EXISTING USER
const login_user = async (params) => {
    const query = axios.post(login_url, params)
    return wrapper(query)
}

export {
    create_user,
    login_user
}