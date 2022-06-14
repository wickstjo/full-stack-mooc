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

module.exports = {
    fetch_all_users,
    create_user,
    login_user,
    create_blog,
    fetch_blog,
    fetch_all_blogs
}