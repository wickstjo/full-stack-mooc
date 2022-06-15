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
        .post('/api/login')
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
        expect(response.body.id).toBeDefined()
        expect(response.body.blogs).toBeDefined()
        expect(response.body.password).not.toBeDefined()

        // COMPARE INPUT OUTPUT
        expect(response.body.username).toBe(target.username)
        expect(response.body.name).toBe(target.name)

        // ATTACH ID
        target.id = response.body.id
    })

    // LOG IN
    await login_user(target, response => {
        expect(response.status).toBe(200)
        expect(response.body.username).toBe(target.username)
        expect(response.body.token).toBeDefined()

        // ATTACH BEARER TOKEN
        target.token = response.body.token
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
    create_and_login
}