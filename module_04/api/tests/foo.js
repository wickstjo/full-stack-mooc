const mongoose = require('mongoose')
const helpers = require('./helpers.js')
const mock_user = require('./mock/mock_user.json')
const mock_blog = require('./mock/mock_blog.json')

// NUKE DATABASE BEFORE TESTS
beforeEach(async() => {
    
    // CREATE USER
    await helpers.create_user(mock_user, response => {
        expect(response.status).toBe(201)
    })

    // LOG IN TO CREATE 
    await helpers.login_user(mock_user, response => {
        expect(response.status).toBe(200)
        expect(response.body.token).toBeDefined()
        
        // SAVE BEARER TOKEN
        mock_user.token = response.body.token
    })
})

// PRELIMINARY STUFF
describe('Baseline', () => {
    test('Initial array is empty', async() => {

        // PERFORM QUERY
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(response => {
                
                // VERYIFY EXPECTATIONS
                expect(response.body).toEqual([])
            })
    })
})

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

// USER CREATION TESTS
describe('User Creation', () => {
    test('With all properties succeeds', async() => {

        // CREATE MOCK ENTRY
        const entry = {
            username: 'foo',
            name: 'bar',
            password: 'biz',
        }

        // CREATE USER
        await create_user(entry, response => {
            expect(response.status).toBe(201)

            // VERYIFY EXPECTATIONS
            expect(response.body.username).toBe(entry.username)
            expect(response.body.name).toBe(entry.name)
            expect(response.body.id).toBeDefined()
        })
    })

    test('Without name succeeds', async() => {

        // CREATE MOCK ENTRY
        const entry = {
            username: 'foo',
            password: 'biz',
        }

        // CREATE USER
        await create_user(entry, response => {
            expect(response.status).toBe(201)

            // VERYIFY EXPECTATIONS
            expect(response.body.username).toBe(entry.username)
            expect(response.body.id).toBeDefined()
        })
    })

    test('Without a username or password fails correctly', async() => {

        // CREATE USER
        await create_user(null, response => {
            expect(response.status).toBe(400)

            // VERYIFY EXPECTATIONS
            expect(response.body.errors).toEqual([
                'A username and password is required.'
            ])
        })
    })

    test('Username uniqueness is enforced', async() => {

        // CREATE MOCK ENTRY
        const entry = {
            username: 'foo',
            password: 'biz',
        }

        // CREATE USER
        await create_user(entry, response => {
            expect(response.status).toBe(201)

            // VERYIFY EXPECTATIONS
            expect(response.body.username).toBe(entry.username)
            expect(response.body.id).toBeDefined()
        })

        // CREATE SAME USER AGAIN
        await create_user(entry, response => {
            expect(response.status).toBe(400)

            // VERYIFY EXPECTATIONS
            expect(response.body.errors).toEqual([
                'The username is not unique'
            ])
        })
    })
})

// LOGIN TESTS
describe('User login', () => {
    test('Valid credentials succeeds', async() => {

        // CREATE MOCK ENTRY
        const entry = {
            username: 'foo',
            password: 'biz',
        }

        // CREATE USER
        await create_user(entry, response => {
            expect(response.status).toBe(201)

            // VERYIFY EXPECTATIONS
            expect(response.body.username).toBe(entry.username)
            expect(response.body.id).toBeDefined()
        })

        // ATTEMPT TO LOGIN
        await login_user(entry, response => {
            expect(response.status).toBe(200)

            // VERYIFY EXPECTATIONS
            expect(response.body.username).toBe(entry.username)
            expect(response.body.token).toBeDefined()
        })
    })

    test('Invalid credentials fails', async() => {

        // CREATE MOCK ENTRY
        const entry = {
            username: 'foo',
            password: 'biz',
        }

        // ATTEMPT TO LOGIN
        await login_user(entry, response => {
            expect(response.status).toBe(401)

            // VERYIFY EXPECTATIONS
            expect(response.body.errors).toEqual([
                'Username and password combination does not exist.'
            ])
        })
    })
})

// CLOSE MONGOOSE CONNECTION AFTER
afterAll(() => {
    mongoose.connection.close()
}) 