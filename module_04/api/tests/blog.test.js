const mongoose = require('mongoose')
const helpers = require('./helpers.js')

// MODELS & MOCK ENTRIES
const User = require('../models/user.js')
const Blog = require('../models/blog.js')
const mock_users = require('./mock/users.js')
const mock_blogs = require('./mock/blogs.js')

// NUKE DATABASES BEFORE TESTS
beforeEach(async() => {

    // NUKE DATABASE
    await User.deleteMany({})
    await Blog.deleteMany({})

    // VERIFY CONTAINER EMPINESS
    await helpers.fetch_all_users(response => {
        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
    })

    // VERIFY CONTAINER EMPINESS
    await helpers.fetch_all_blogs(response => {
        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
    })
})

describe('Baseline', () => {
    test('With invalid token fails correctly', async() => {

        // MOCK BLOG
        const target = { ...mock_blogs.proper_blog }

        // UNEXISTENT BEARER TOKEN
        const token = 'bad_token'

        await helpers.create_blog(target, token, response => {
            expect(response.status).toBe(401)
            expect(response.body.errors).toEqual([
                'Invalid bearer token'
            ])
        })
    })

    test('With valid token succeeds correctly', async() => {

        // CREATE AND LOGIN MOCK USER
        const user = await helpers.create_and_login(mock_users.proper)

        // MOCK BLOG
        const target = { ...mock_blogs.proper_blog }
        
        // CREATE A BLOG
        await helpers.create_blog(target, user.token, response => {
            expect(response.status).toBe(201)
            
            // VERIFY PARAMS
            expect(response.body.title).toBe(target.title)
            expect(response.body.author).toBe(target.author)
            expect(response.body.url).toBe(target.url)
            expect(response.body.likes).toBe(target.likes)
            expect(response.body.id).toBeDefined()
            expect(response.body.user).toBe(user.id)
        })
        
        // VERIFY THAT ITS LISTED IN THE USER PROFILE
        await helpers.fetch_user(user.id, response => {
            expect(response.status).toBe(200)

            // CHECK FIRST ENTRY
            expect(response.body.blogs[0].title).toEqual(target.title)
            expect(response.body.blogs[0].author).toEqual(target.author)
            expect(response.body.blogs[0].url).toEqual(target.url)
            expect(response.body.blogs[0].likes).toEqual(target.likes)
        })
    })
})

describe('Likes tests', () => {
    test('With likes succeeds correctly', async() => {

        // CREATE AND LOGIN MOCK USER
        const user = await helpers.create_and_login(mock_users.proper)

        // MOCK BLOG
        const target = { ...mock_blogs.proper_blog }
        
        // CREATE A BLOG
        await helpers.create_blog(target, user.token, response => {
            expect(response.status).toBe(201)

            // VERIFY PARAMS
            expect(response.body.title).toBe(target.title)
            expect(response.body.author).toBe(target.author)
            expect(response.body.url).toBe(target.url)
            expect(response.body.likes).toBe(target.likes)
            expect(response.body.user).toBe(user.id)
            expect(response.body.id).toBeDefined()
        })

        // VERIFY THAT ITS LISTED IN THE USER PROFILE
        await helpers.fetch_user(user.id, response => {
            expect(response.status).toBe(200)

            // CHECK FIRST ENTRY
            expect(response.body.blogs[0].title).toEqual(target.title)
            expect(response.body.blogs[0].author).toEqual(target.author)
            expect(response.body.blogs[0].url).toEqual(target.url)
            expect(response.body.blogs[0].likes).toEqual(target.likes)
        })
    })

    test('No likes succeeds correctly', async() => {

        // CREATE AND LOGIN MOCK USER
        const user = await helpers.create_and_login(mock_users.proper)

        // MOCK BLOG
        const target = { ...mock_blogs.no_likes }
        
        // CREATE A BLOG
        await helpers.create_blog(target, user.token, response => {
            expect(response.status).toBe(201)

            // VERIFY PARAMS
            expect(response.body.title).toBe(target.title)
            expect(response.body.author).toBe(target.author)
            expect(response.body.url).toBe(target.url)
            expect(response.body.likes).toBe(0)
            expect(response.body.user).toBe(user.id)
            expect(response.body.id).toBeDefined()
        })

        // VERIFY THAT ITS LISTED IN THE USER PROFILE
        await helpers.fetch_user(user.id, response => {
            expect(response.status).toBe(200)

            // CHECK FIRST ENTRY
            expect(response.body.blogs[0].title).toEqual(target.title)
            expect(response.body.blogs[0].author).toEqual(target.author)
            expect(response.body.blogs[0].url).toEqual(target.url)
            expect(response.body.blogs[0].likes).toEqual(0)
        })
    })
})

describe('Title tests', () => {
    test('No title fails correctly', async() => {

        // CREATE AND LOGIN MOCK USER
        const user = await helpers.create_and_login(mock_users.proper)

        // MOCK BLOG
        const target = { ...mock_blogs.no_title }

        await helpers.create_blog(target, user.token, response => {
            expect(response.status).toBe(400)
            expect(response.body.errors).toEqual([
                'A title is required.'
            ])
        })
    })

    test('Short title fails correctly', async() => {

        // CREATE AND LOGIN MOCK USER
        const user = await helpers.create_and_login(mock_users.proper)

        // MOCK BLOG
        const target = { ...mock_blogs.short_title }

        await helpers.create_blog(target, user.token, response => {
            expect(response.status).toBe(400)
            expect(response.body.errors).toEqual([
                'A title must be at least 3 characters.'
            ])
        })
    })
})

describe('Author tests', () => {
    test('No author fails correctly', async() => {

        // CREATE AND LOGIN MOCK USER
        const user = await helpers.create_and_login(mock_users.proper)

        // MOCK BLOG
        const target = { ...mock_blogs.no_author }

        await helpers.create_blog(target, user.token, response => {
            expect(response.status).toBe(400)
            expect(response.body.errors).toEqual([
                'An author is required.'
            ])
        })
    })

    test('Short author fails correctly', async() => {

        // CREATE AND LOGIN MOCK USER
        const user = await helpers.create_and_login(mock_users.proper)

        // MOCK BLOG
        const target = { ...mock_blogs.short_author }

        await helpers.create_blog(target, user.token, response => {
            expect(response.status).toBe(400)
            expect(response.body.errors).toEqual([
                'An author must be at least 3 characters.'
            ])
        })
    })
})

describe('URL tests', () => {
    test('No url fails correctly', async() => {

        // CREATE AND LOGIN MOCK USER
        const user = await helpers.create_and_login(mock_users.proper)

        // MOCK BLOG
        const target = { ...mock_blogs.no_url }

        await helpers.create_blog(target, user.token, response => {
            expect(response.status).toBe(400)
            expect(response.body.errors).toEqual([
                'An url is required.'
            ])
        })
    })

    test('Short url fails correctly', async() => {

        // CREATE AND LOGIN MOCK USER
        const user = await helpers.create_and_login(mock_users.proper)

        // MOCK BLOG
        const target = { ...mock_blogs.short_url }

        await helpers.create_blog(target, user.token, response => {
            expect(response.status).toBe(400)
            expect(response.body.errors).toEqual([
                'An url must be at least 3 characters.'
            ])
        })
    })
})

// CLOSE MONGOOSE CONNECTION AFTER
afterAll(() => {
    mongoose.connection.close()
}) 