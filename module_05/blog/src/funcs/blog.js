import axios from 'axios'

// BASE URL FOR REQUESTS
const base_url = 'http://localhost:3001/api/blogs'

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
const create = async(params, token) => {
    const query = axios.post(base_url, params, {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    })
    return wrapper(query)
}

// REMOVE BLOG
const remove = async (id, token) => {
    const target = `${ base_url }/${ id }`

    const query = axios.delete(target, {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    })

    return wrapper(query)
}

// UPDATE BLOG
const update = (input, id, token) => {
    const target = `${ base_url }/${ id }`

    const query = axios.put(target, input, {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    })

    return wrapper(query)
}

// LIKE BLOG
const like = async (id, token) => {
    const target = `${ base_url }/${ id }/increment`

    const query = axios.get(target, {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    })

    return wrapper(query)
}

// LIKE BLOG
const dislike = async (id, token) => {
    const target = `${ base_url }/${ id }/decrement`

    const query = axios.get(target, {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    })

    return wrapper(query)
}

export {
    fetch_all,
    create,
    remove,
    update,
    like,
    dislike,
}