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

    // VERIFY USER CONTAINER EMPINESS
    await helpers.fetch_all_users(response => {
        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
    })

    // VERIFY BLOG CONTAINER EMPINESS
    await helpers.fetch_all_blogs(response => {
        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
    })
})

describe('Blog creation', () => {
    test('With invalid token fails correctly', async() => {

        // MOCK BLOG
        const target = { ...mock_blogs.proper_blog }

        // NON-EXISTENT BEARER TOKEN
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

        // VERIFY INITIAL BLOG COUNT
        await helpers.fetch_all_blogs(response => {
            expect(response.body.length).toBe(0)
        })
        
        // CREATE A BLOG
        await helpers.create_blog(target, user.token, response => {
            expect(response.status).toBe(201)
            
            // VERIFY PARAMS
            expect(response.body.title).toBe(target.title)
            expect(response.body.author).toBe(target.author)
            expect(response.body.url).toBe(target.url)
            expect(response.body.likes).toBe(target.likes)
            expect(response.body.id).toBeDefined()
            expect(response.body._id).not.toBeDefined()
            expect(response.body.user.id).toBe(user.id)
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

        // VERIFY THAT BLOG COUNT HAS INCREASED
        await helpers.fetch_all_blogs(response => {
            expect(response.body.length).toBe(1)
        })
    })
})

describe('Likes input tests', () => {
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
            expect(response.body.user.id).toBe(user.id)
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
            expect(response.body.user.id).toBe(user.id)
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

describe('Title input tests', () => {
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

describe('Author input tests', () => {
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

describe('URL input tests', () => {
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

describe('Blog removal', () => {
    test('With valid token succeeds correcly', async() => {

        // CREATE AND LOGIN MOCK USER
        const user = await helpers.create_and_login(mock_users.proper)

        // MOCK BLOG
        const target = { ...mock_blogs.proper_blog }
        
        // CREATE A BLOG
        await helpers.create_blog(target, user.token, response => {
            expect(response.status).toBe(201)
            expect(response.body.id).toBeDefined()
            
            // SAVE THE CREATED ID
            target.id = response.body.id
        })

        // VERIFY THAT BLOG EXISTS IN ALL BLOGS
        await helpers.fetch_all_blogs(response => {
            expect(response.status).toBe(200)
            expect(response.body[0].title).toEqual(target.title)
        })

        // VERIFY THAT BLOG EXISTS IN USER PROFILE
        await helpers.fetch_user(user.id, response => {
            expect(response.status).toBe(200)
            expect(response.body.blogs[0].title).toEqual(target.title)
        })
        
        // REMOVE THE BLOG
        await helpers.remove_blog(target.id, user.token, response => {
            expect(response.status).toBe(204)
        })

        // VERIFY THAT BLOG NO-LONGER EXISTS
        await helpers.fetch_blog(target.id, response => {
            expect(response.status).toBe(404)
            expect(response.body.errors).toEqual([
                'ID does not exist.'
            ])
        })

        // VERIFY BOTH CONTAINERS
        await helpers.fetch_all_blogs(response => {
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(0)
        })

        // VERIFY THAT BLOG EXISTS IN USER PROFILE
        await helpers.fetch_user(user.id, response => {
            expect(response.status).toBe(200)
            expect(response.body.blogs.length).toBe(0)
        })
    })

    test('With invalid token fails correcly', async() => {

        // CREATE AND LOGIN MOCK USER
        const user = await helpers.create_and_login(mock_users.proper)

        // MOCK BLOG
        const target = { ...mock_blogs.proper_blog }
        
        // CREATE A BLOG
        await helpers.create_blog(target, user.token, response => {
            expect(response.status).toBe(201)
            expect(response.body.id).toBeDefined()
            
            // SAVE THE CREATED ID
            target.id = response.body.id
        })
        
        // RANDOM NON EXISTENT TOKEN
        const bad_token = 'foofoo'

        // REMOVE THE BLOG WITH BAD TOKEN
        await helpers.remove_blog(target.id, bad_token, response => {
            expect(response.status).toBe(401)
            expect(response.body.errors).toEqual([
                'Invalid bearer token'
            ])
        })
    })

    test('With invalid ID fails correcly', async() => {

        // CREATE AND LOGIN MOCK USER
        const user = await helpers.create_and_login(mock_users.proper)

        // MOCK BLOG
        const target = { ...mock_blogs.proper_blog }
        
        // CREATE A BLOG
        await helpers.create_blog(target, user.token, response => {
            expect(response.status).toBe(201)
            expect(response.body.id).toBeDefined()
            
            // SAVE THE CREATED ID
            target.id = response.body.id
        })
        
        // RANDOM NON EXISTENT TOKEN
        const bad_token = 'foofoo'

        // REMOVE THE BLOG WITH BAD TOKEN
        await helpers.remove_blog(target.id, bad_token, response => {
            expect(response.status).toBe(401)
            expect(response.body.errors).toEqual([
                'Invalid bearer token'
            ])
        })
    })

    test('Non-existent blog ID fails correctly', async() => {

        // CREATE AND LOGIN MOCK USER
        const user = await helpers.create_and_login(mock_users.proper)

        // NON-EXISTENT 24-CHAR ID
        const bad_id = '123412341234123412341234'

        // REMOVE THE BLOG WITH BAD TOKEN
        await helpers.remove_blog(bad_id, user.token, response => {
            expect(response.status).toBe(404)
            expect(response.body.errors).toEqual([
                'ID does not exist.'
            ])
        })
    })
})

describe('Blog update', () => {
    test('With valid token succeeds correcly', async() => {

        // CREATE AND LOGIN MOCK USER
        const user = await helpers.create_and_login(mock_users.proper)

        // MOCK BLOG
        const target = { ...mock_blogs.proper_blog }
        
        // CREATE A BLOG
        await helpers.create_blog(target, user.token, response => {
            expect(response.status).toBe(201)
            expect(response.body.id).toBeDefined()
            
            // SAVE THE CREATED ID
            target.id = response.body.id
        })
        
        // BLOG MODIFICATIONS
        const modifications = {
            likes: 616161
        }
        
        // UPDATE THE BLOG
        await helpers.update_blog(target.id, modifications, user.token, response => {
            expect(response.status).toBe(200)
            expect(response.body.likes).toBe(modifications.likes)
        })
    })

    test('With Invalid token fails correcly', async() => {

        // CREATE AND LOGIN MOCK USER
        const user = await helpers.create_and_login(mock_users.proper)

        // MOCK BLOG
        const target = { ...mock_blogs.proper_blog }
        
        // CREATE A BLOG
        await helpers.create_blog(target, user.token, response => {
            expect(response.status).toBe(201)
            expect(response.body.id).toBeDefined()
            
            // SAVE THE CREATED ID
            target.id = response.body.id
        })

        // BLOG MODIFICATIONS
        const modifications = {
            likes: 616161
        }

        // RANDOM NON-EXISTENT TOKEN
        const bad_token = 'foofoo'
        
        // UPDATE THE BLOG
        await helpers.update_blog(target.id, modifications, bad_token, response => {
            expect(response.status).toBe(401)
            expect(response.body.errors).toEqual([
                'Invalid bearer token'
            ])
        })
    })

    test('With invalid ID fails correcly', async() => {

        // CREATE AND LOGIN MOCK USER
        const user = await helpers.create_and_login(mock_users.proper)

        // BLOG MODIFICATIONS
        const modifications = {
            likes: 616161
        }

        // NON-EXISTENT 24-CHAR ID
        const bad_id = '123412341234123412341234'
        
        // UPDATE THE BLOG
        await helpers.update_blog(bad_id, modifications, user.token, response => {
            expect(response.status).toBe(400)
            expect(response.body.errors).toEqual([
                'Could not update entry'
            ])
        })
    })
})

// CLOSE MONGOOSE CONNECTION AFTER
afterAll(() => {
    mongoose.connection.close()
}) 