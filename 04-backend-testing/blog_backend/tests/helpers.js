// CREATE MOCK API INSTANCE
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

// FETCH ALL USERS
const fetch_all_users = async (verify) => {
    return await api
        .get('/api/users')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(verify)
}

// FETCH USER BY ID
const fetch_user = async (id, verify) => {
    return await api
        .get(`/api/users/${ id }`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(verify)
}


// USER CREATION SHORTHAND
const create_user = async (entry, verify) => {
    return await api
        .post('/api/users')
        .send(entry)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(verify)
}

// LOGIN SHORTHAND
const login_user = async (entry, verify) => {
    return await api
        .post('/api/users/auth')
        .send(entry)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(verify)
}

// CREATE BLOG SHORTHAND
const create_blog = async (entry, token, verify) => {
    return await api
        .post('/api/blogs')
        .set({ Authorization: `Bearer ${ token }` })
        .send(entry)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(verify)
}

// REMOVE BLOG SHORTHAND
const remove_blog = async (id, token, verify) => {
    return await api
        .delete(`/api/blogs/${ id }`)
        .set({ Authorization: `Bearer ${ token }` })
        .expect(verify)
}

// UPDATE BLOG SHORTHAND
const update_blog = async (id, entry, token, verify) => {
    return await api
        .put(`/api/blogs/${ id }`)
        .send(entry)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .set({ Authorization: `Bearer ${ token }` })
        .expect(verify)
}

// FETCH BLOG BY ID
const fetch_blog = async (id, verify) => {
    return await api
        .get(`/api/blogs/${ id }`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(verify)
}

// FETCH ALL BLOGS
const fetch_all_blogs = async (verify) => {
    return await api
        .get('/api/blogs')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(verify)
}

// CREATE USER AND LOG THEM IN -- TO OBTAIN BEARER TOKEN
const create_and_login = async (raw_entry) => {

    // CLONE THE ENTRY
    const target = { ...raw_entry };

    await create_user(target, response => {
        expect(response.status).toBe(201)
        
        // DEFINED CHECK
        expect(response.body.user.id).toBeDefined()
        expect(response.body.user.blogs).toBeDefined()
        expect(response.body.user.password).not.toBeDefined()

        // COMPARE INPUT OUTPUT
        expect(response.body.user.username).toBe(target.username)
        expect(response.body.user.name).toBe(target.name)

        // ATTACH NECESSARY PARAMS
        target.token = response.body.token
        target.id = response.body.user.id
    })

    delete target.password
    return target
}

module.exports = {
    fetch_all_users,
    fetch_user,
    create_user,
    login_user,
    create_blog,
    fetch_blog,
    fetch_all_blogs,
    create_and_login,
    remove_blog,
    update_blog
}