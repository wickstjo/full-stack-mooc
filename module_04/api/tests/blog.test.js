const supertest = require('supertest')
const mongoose = require('mongoose')

// CREATE MOCK API INSTANCE
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog.js')

// NUKE DATABASE BEFORE TESTS
beforeEach(async() => {
    await Blog.deleteMany({})
})

// PRELIMINARY STUFF
describe('API Basics', () => {
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
})

// BLOG CREATION
describe('Blog Creation', () => {

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
    })

    test('Creation increases the capacity', async() => {

        // CREATE MOCK ENTRY
        const entry = {
            title: 'foo',
            author: 'bar',
            url: 'biz',
        }

        // HOW MANY ITEMS TO CREATE
        const n_items = 5;

        // LOOP X TIMES
        for (let x=0; x < n_items; x++) {

            // CREATE POST
            await api
                .post('/api/blogs')
                .send(entry)
                .expect(201)
                .expect('Content-Type', 'application/json; charset=utf-8')

            // VERIFY THAT MAIN CONTAINER HAS GROWN
            await api
                .get('/api/blogs')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(response => {
    
                    // VERYIFY EXPECTATIONS
                    expect(response.status).toBe(200)
                    expect(response.body.length).toBe(x+1)
                })
        }

        // VERIFY THAT THE FINAL CONTAINER IS THE CORRECT SIZE
        await api
            .get('/api/blogs')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(response => {

                // VERYIFY EXPECTATIONS
                expect(response.status).toBe(200)
                expect(response.body.length).toBe(n_items)
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

// BLOG REMOVAL
describe('Blog Removal', () => {
    test('Removal of existing ID works', async() => {

        // CREATE MOCK ENTRY
        const entry = {
            title: 'foo',
            author: 'bar',
            url: 'biz',
            likes: 0
        }

        // CREATE A USER
        await api
            .post('/api/blogs')
            .send(entry)
            .expect(201)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(response => {

                // SAVE ID
                entry.id = response.body.id
            })

        // VERIFY ID EXISTENCE
        await api
            .get(`/api/blogs/${ entry.id }`)
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(response => {

                // MAKE OBJECTS MATCH
                expect(response.body).toEqual(entry)
            })
        
        // ATTEMPT TO REMOVE THE USER
        await api
            .delete(`/api/blogs/${ entry.id }`)
            .send(entry)
            .expect(204)

        // VERIFY ID EXISTENCE AGAIN
        await api
            .get(`/api/blogs/${ entry.id }`)
            .expect(404)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(response => {

                // CHECK FOR A CORRECT ERROR
                expect(response.body.errors).toEqual([
                    'ID does not exist.'
                ])
            })
    })

    test('Removal of non-existent ID fails correctly', async() => {

        // FAKE ID
        const fake_id = '111111111111111111111111'

        // VERIFY ID EXISTENCE AGAIN
        await api
            .get(`/api/blogs/${ fake_id }`)
            .expect(404)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(response => {

                // CHECK FOR A CORRECT ERROR
                expect(response.body.errors).toEqual([
                    'ID does not exist.'
                ])
            })
    })
})

describe('Blog Updating', () => {
    test('Updating of existing ID works', async() => {

        // CREATE MOCK ENTRY
        const entry = {
            title: 'foo',
            author: 'bar',
            url: 'biz',
            likes: 0
        }

        // CREATE A USER
        await api
            .post('/api/blogs')
            .send(entry)
            .expect(201)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(response => {

                // SAVE GENERATED ID
                entry.id = response.body.id
            })

        // VERIFY ID EXISTENCE
        await api
            .get(`/api/blogs/${ entry.id }`)
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(response => {

                // MAKE OBJECTS MATCH
                expect(response.body).toEqual(entry)
            })

        const modified = {
            likes: 15
        }
        
        // ATTEMPT TO UPDATE THE USER
        await api
            .put(`/api/blogs/${ entry.id }`)
            .send(modified)
            .expect(200)

        // VERIFY ID EXISTENCE AGAIN
        await api
            .get(`/api/blogs/${ entry.id }`)
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(response => {

                // VERIFY THAT THE LIKES PROPERTY HAS BEEN UPDATED
                expect(response.body.likes).toBe(modified.likes)
            })
    })

    test('Updating of non-existent ID fails correctly', async() => {

        // FAKE ID
        const fake_id = '111111111111111111111111'

        // MOCK DATA
        const modified = {
            likes: 15
        }
        
        // ATTEMPT TO UPDATE NONSENSE ID
        await api
            .put(`/api/blogs/${ fake_id }`)
            .send(modified)
            .expect(400)
            .expect(response => {

                // VERIFY THAT THE ERROR MATCHES
                expect(response.body.errors).toEqual([
                    'ID does not exist.'
                ])
            })
    })
})

// CLOSE MONGOOSE CONNECTION AFTER
afterAll(() => {
    mongoose.connection.close()
}) 