const mongoose = require('mongoose')
const helpers = require('./helpers.js')

// MODELS & MOCK ENTRIES
const User = require('../models/user.js')
const mock_users = require('./mock/users.js')

// NUKE DATABASE BEFORE TESTS
beforeEach(async() => {

    // NUKE DATABASE
    await User.deleteMany({})

    // VERIFY CONTAINER EMPINESS
    await helpers.fetch_all_users(response => {
        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
    })
})

describe('Baseline', () => {
    test('Proper user authentication succeeds correctly', async() => {

        // MOCK USER
        const target = { ...mock_users.proper }

        await helpers.create_user(target, response => {
            expect(response.status).toBe(201)
            
            // DEFINED CHECK
            expect(response.body.user.id).toBeDefined()
            expect(response.body.user.blogs).toBeDefined()
            expect(response.body.user.password).not.toBeDefined()

            // COMPARE INPUT OUTPUT
            expect(response.body.user.username).toBe(target.username)
            expect(response.body.user.name).toBe(target.name)

            // ATTACH ID TO TARGET FOR LOGIN
            target.id = response.body.id
        })

        // LOG IN
        await helpers.login_user(target, response => {
            expect(response.status).toBe(200)
            expect(response.body.username).toBe(target.username)
            expect(response.body.token).toBeDefined()
        })
    })

    test('Unknown user authentication fails correctly', async() => {

        // MOCK USER
        const target = { ...mock_users.proper }

        // LOG IN
        await helpers.login_user(target, response => {
            expect(response.status).toBe(401)
            expect(response.body.errors).toEqual([
                'Username and password combination does not exist.'
            ])
        })
    })
})

describe('Misc', () => {
    test('Create and login shorthand func works correctly', async() => {

        // CREATE & LOGIN USER WITH SHORTHAND FUNC
        const created = await helpers.create_and_login(mock_users.proper)

        // VERIFY CREATED MOCK USER
        expect(created.username).toBe(mock_users.proper.username)
        expect(created.token).toBeDefined()
        expect(created.id).toBeDefined()
        expect(created.password).not.toBeDefined()
    })
})

// CLOSE MONGOOSE CONNECTION AFTER
afterAll(() => {
    mongoose.connection.close()
}) 