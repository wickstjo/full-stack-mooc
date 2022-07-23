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
    test('Proper user succeeds correctly', async() => {

        // MOCK USER
        const target = { ...mock_users.proper }

        await helpers.create_user(target, response => {
            expect(response.status).toBe(201)
            
            // DEFINED CHECK
            expect(response.body.id).toBeDefined()
            expect(response.body.blogs).toBeDefined()
            expect(response.body.password).not.toBeDefined()

            // COMPARE INPUT OUTPUT
            expect(response.body.username).toBe(target.username)
            expect(response.body.name).toBe(target.name)
        })
    })

    test('Username uniqueness is enforced correctly', async() => {

        // MOCK USER
        const target = { ...mock_users.proper }

        // CREATE USER ONCE
        await helpers.create_user(target, response => {
            expect(response.status).toBe(201)
            
            // DEFINED CHECK
            expect(response.body.id).toBeDefined()
            expect(response.body.blogs).toBeDefined()
            expect(response.body.password).not.toBeDefined()

            // COMPARE INPUT OUTPUT
            expect(response.body.username).toBe(target.username)
            expect(response.body.name).toBe(target.name)
        })

        // CREATE SAME USER AGAIN
        await helpers.create_user(target, response => {
            expect(response.status).toBe(400)
            expect(response.body.errors).toEqual([
                'The username is not unique'
            ])
        })
    })
})

describe('Username tests', () => {
    test('No username fails correctly', async() => {

        // MOCK USER
        const target = { ...mock_users.no_username }

        await helpers.create_user(target, response => {
            expect(response.status).toBe(400)
            expect(response.body.errors).toEqual([
                'A username and password is required.'
            ])
        })
    })

    test('Short username fails correctly', async() => {

        // MOCK USER
        const target = { ...mock_users.short_username }

        await helpers.create_user(target, response => {
            expect(response.status).toBe(400)
            expect(response.body.errors).toEqual([
                'A username must be at least 3 characters.'
            ])
        })
    })
})

describe('Password tests', () => {
    test('No password fails correctly', async() => {

        // MOCK USER
        const target = { ...mock_users.no_password }

        await helpers.create_user(target, response => {
            expect(response.status).toBe(400)
            expect(response.body.errors).toEqual([
                'A username and password is required.'
            ])
        })
    })

    test('Short password fails correctly', async() => {

        // MOCK USER
        const target = { ...mock_users.short_password }

        await helpers.create_user(target, response => {
            expect(response.status).toBe(400)
            expect(response.body.errors).toEqual([
                'A password must be at least 3 characters.'
            ])
        })
    })
})

describe('Name tests', () => {
    test('No name succeeds correctly', async() => {

        // MOCK USER
        const target = { ...mock_users.nameless }

        await helpers.create_user(target, response => {
            expect(response.status).toBe(201)
            
            // DEFINED CHECK
            expect(response.body.id).toBeDefined()
            expect(response.body.blogs).toBeDefined()
            expect(response.body.password).not.toBeDefined()
            expect(response.body.name).not.toBeDefined()

            // COMPARE INPUT OUTPUT
            expect(response.body.username).toBe(target.username)
        })
    })

    test('Short name fails correctly', async() => {

        // MOCK USER
        const target = { ...mock_users.short_name }

        await helpers.create_user(target, response => {
            expect(response.status).toBe(400)
            expect(response.body.errors).toEqual([
                'A name must be at least 3 characters.'
            ])
        })
    })
})

// CLOSE MONGOOSE CONNECTION AFTER
afterAll(() => {
    mongoose.connection.close()
})