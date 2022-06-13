const supertest = require('supertest')
const mongoose = require('mongoose')

// CREATE MOCK API INSTANCE
const app = require('../app')
const api = supertest(app)

const Blog = require('../api/schema.js')

// NUKE DATABASE BEFORE TESTS
beforeEach(async() => {
    await Blog.deleteMany({})
})

describe('Blog API tests', () => {

    test('Initial array is empty', async() => {

        // PERFORM QUERY
        await api
            .get('/api/blogs')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(response => {
                
                // VERYIFY EXPECTATIONS
                expect(response.status).toBe(200)
                expect(response.body).toEqual([])
            })
    })

    test('Creation without likes works correctly', async() => {

        // CREATE MOCK ENTRY
        const entry = {
            title: 'foo',
            author: 'bar',
            url: 'biz',
        }

        // PERFORM POST QUERY
        await api
            .post('/api/blogs')
            .send(entry)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(response => {

                // VERYIFY EXPECTATIONS
                expect(response.status).toBe(201)
                expect(response.body.title).toBe(entry.title)
                expect(response.body.author).toBe(entry.author)
                expect(response.body.url).toBe(entry.url)
                expect(response.body.likes).toBe(0)
                expect(response.body.id).toBeDefined()

                // PUSH LIKES & ID TO ENTRY
                entry.likes = response.body.likes
                entry.id = response.body.id
            })

        // CHECK THAT THE TOTAL COUNT HAS INCREASED
        await api
            .get('/api/blogs')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(response => {

                // VERYIFY EXPECTATIONS
                expect(response.status).toBe(200)
                expect(response.body.length).toBe(1)
                expect(response.body).toEqual([entry])
            })
    })

    test('Creation with likes works', async() => {

        // CREATE MOCK ENTRY
        const entry = {
            title: 'foo',
            author: 'bar',
            url: 'biz',
            likes: 123
        }

        // PERFORM POST QUERY
        await api
            .post('/api/blogs')
            .send(entry)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(response => {

                // VERYIFY EXPECTATIONS
                expect(response.status).toBe(201)
                expect(response.body.title).toBe(entry.title)
                expect(response.body.author).toBe(entry.author)
                expect(response.body.url).toBe(entry.url)
                expect(response.body.likes).toBe(entry.likes)
                expect(response.body.id).toBeDefined()

                // PUSH ID TO ENTRY
                entry.id = response.body.id
            })

        // CHECK THAT THE TOTAL COUNT HAS INCREASED
        await api
            .get('/api/blogs')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(response => {

                // VERYIFY EXPECTATIONS
                expect(response.status).toBe(200)
                expect(response.body.length).toBe(1)
                expect(response.body).toEqual([entry])
            })
    })

    test('Creation without title fails correctly', async() => {

        // CREATE MOCK ENTRY
        const entry = {
            author: 'bar',
            url: 'biz',
        }

        // PERFORM POST QUERY
        await api
            .post('/api/blogs')
            .send(entry)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(response => {

                // VERYIFY EXPECTATIONS
                expect(response.status).toBe(400)
                expect(response.body.errors.length).toBe(1)
                expect(response.body.errors).toEqual(['A title is required.'])
            })
    })

    test('Creation without an URL fails correctly', async() => {

        // CREATE MOCK ENTRY
        const entry = {
            title: 'foo',
            author: 'bar',
        }

        // PERFORM POST QUERY
        await api
            .post('/api/blogs')
            .send(entry)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(response => {

                // VERYIFY EXPECTATIONS
                expect(response.status).toBe(400)
                expect(response.body.errors.length).toBe(1)
                expect(response.body.errors).toEqual(['An url is required.'])
            })
    })

    test('Creation without author fails correctly', async() => {

        // CREATE MOCK ENTRY
        const entry = {
            title: 'foo',
            url: 'biz',
        }

        // PERFORM POST QUERY
        await api
            .post('/api/blogs')
            .send(entry)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(response => {

                // VERYIFY EXPECTATIONS
                expect(response.status).toBe(400)
                expect(response.body.errors.length).toBe(1)
                expect(response.body.errors).toEqual(['An author is required.'])
            })
    })

    test('Creation without body fails correctly', async() => {

        // PERFORM POST QUERY
        await api
            .post('/api/blogs')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(response => {

                // VERYIFY EXPECTATIONS
                expect(response.status).toBe(400)
                expect(response.body.errors.length).toBe(3)
                expect(response.body.errors).toEqual([
                    'An url is required.',
                    'An author is required.',
                    'A title is required.'
                ])
            })
    })
})

// CLOSE MONGOOSE CONNECTION AFTER
afterAll(() => {
    mongoose.connection.close()
}) 