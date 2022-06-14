const mongoose = require('mongoose')
const helpers = require('./helpers.js')

const Blog = require('../models/blog.js')
const User = require('../models/user.js')

// NUKE DATABASE BEFORE TESTS
beforeEach(async() => {
    await Blog.deleteMany({})
    await User.deleteMany({})
})

// BASELINE CHECKS
describe('Baseline containers', () => {

    // CHECK USERS
    test('Default users are empty', async() => {
        await helpers.fetch_all_users(response => {
            expect(response.status).toBe(200)
            expect(response.body).toEqual([])
        })
    })

    // CHECK BLOGS
    test('Default blogs are empty', async() => {
        await helpers.fetch_all_blogs(response => {
            expect(response.status).toBe(200)
            expect(response.body).toEqual([])
        })
    })
})

// BLOG CREATION
describe('Blog Creation', () => {
    test('With likes succeeds', async() => {

        // CREATE MOCK ENTRY
        const mock_user = {
            username: 'foo',
            name: 'bar',
            password: 'biz',
        }

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

        // CREATE MOCK ENTRY
        const mock_blog = {
            title: 'foo',
            author: 'bar',
            url: 'biz',
            likes: 123
        }

        // CREATE A BLOG
        await helpers.create_blog(mock_blog, mock_user.token, response => {
            expect(response.status).toBe(201)

            // VERYIFY EXPECTATIONS
            expect(response.body.title).toBe(mock_blog.title)
            expect(response.body.author).toBe(mock_blog.author)
            expect(response.body.url).toBe(mock_blog.url)
            expect(response.body.likes).toBe(mock_blog.likes)
            expect(response.body.id).toBeDefined()

            // SAVE ID
            mock_blog.id = response.body.id
        })

        // VERIFY THAT THE BLOG ENTRY EXISTS
        await helpers.fetch_blog(mock_blog.id, response => {
            expect(response.status).toBe(200)

            // VERYIFY EXPECTATIONS
            expect(response.body.title).toBe(mock_blog.title)
            expect(response.body.author).toBe(mock_blog.author)
            expect(response.body.url).toBe(mock_blog.url)
            expect(response.body.likes).toBe(mock_blog.likes)
            expect(response.body.id).toBeDefined()
            expect(response.body.user).toBeDefined()
        })
    })

    // test('Without likes succeeds', async() => {

    //     // CREATE MOCK ENTRY
    //     const entry = {
    //         title: 'foo',
    //         author: 'bar',
    //         url: 'biz',
    //     }

    //     // CREATE A BLOG
    //     await create_blog(entry, response => {
    //         expect(response.status).toBe(201)

    //         // VERYIFY EXPECTATIONS
    //         expect(response.body.title).toBe(entry.title)
    //         expect(response.body.author).toBe(entry.author)
    //         expect(response.body.url).toBe(entry.url)
    //         expect(response.body.likes).toBe(0)
    //         expect(response.body.id).toBeDefined()

    //         // ADD LIKES & ID TO ENTRY
    //         entry.likes = 0
    //         entry.id = response.body.id
    //     })

    //     // VERIFY THAT THE BLOG ENTRY EXISTS
    //     await fetch_blog(entry.id, response => {
    //         expect(response.status).toBe(200)

    //         // VERYIFY EXPECTATIONS
    //         expect(response.body).toEqual(entry)
    //     })
    // })

    // test('Creation increases the capacity', async() => {

    //     // HOW MANY USERS TO CREATE
    //     const n_items = 5;

    //     // LOOP X TIMES
    //     for (let x=0; x < n_items; x++) {
            
    //         // CREATE MOCK ENTRY
    //         const entry = {
    //             title: 'foo',
    //             author: 'bar',
    //             url: 'biz',
    //             likes: 0
    //         }

    //         // CREATE A BLOG
    //         await create_blog(entry, response => {
    //             expect(response.status).toBe(201)
                
    //             // SAVE ID
    //             entry.id = response.body.id
    //         })

    //         // FETCH TEMP LENGTH
    //         await fetch_all(response => {
    //             expect(response.status).toBe(200)
                    
    //             // VERYIFY EXPECTATIONS
    //             expect(response.body.length).toBe(x+1)
    //         })
    //     }

    //     // VERIFY FINAL LENGTH
    //     await fetch_all(response => {
    //         expect(response.status).toBe(200)
                
    //         // VERYIFY EXPECTATIONS
    //         expect(response.body.length).toBe(n_items)
    //     })
    // })

    // test('Creation without title fails correctly', async() => {

    //     // CREATE MOCK ENTRY
    //     const entry = {
    //         author: 'bar',
    //         url: 'biz',
    //     }

    //     // CREATE BLOG
    //     await create_blog(entry, response => {
    //         expect(response.status).toBe(400)

    //         // VERYIFY EXPECTATIONS
    //         expect(response.body.errors.length).toBe(1)
    //         expect(response.body.errors).toEqual([
    //             'A title is required.'
    //         ])
    //     })
    // })

    // test('Creation without an URL fails correctly', async() => {

    //     // CREATE MOCK ENTRY
    //     const entry = {
    //         title: 'foo',
    //         author: 'bar',
    //     }

    //     // CREATE BLOG
    //     await create_blog(entry, response => {
    //         expect(response.status).toBe(400)

    //         // VERYIFY EXPECTATIONS
    //         expect(response.body.errors.length).toBe(1)
    //         expect(response.body.errors).toEqual([
    //             'An url is required.'
    //         ])
    //     })
    // })

    // test('Creation without author fails correctly', async() => {

    //     // CREATE MOCK ENTRY
    //     const entry = {
    //         title: 'foo',
    //         url: 'biz',
    //     }

    //     // CREATE BLOG
    //     await create_blog(entry, response => {
    //         expect(response.status).toBe(400)

    //         // VERYIFY EXPECTATIONS
    //         expect(response.body.errors.length).toBe(1)
    //         expect(response.body.errors).toEqual([
    //             'An author is required.'
    //         ])
    //     })
    // })

    // test('Creation without body fails correctly', async() => {

    //     // CREATE BLOG
    //     await create_blog(null, response => {
    //         expect(response.status).toBe(400)

    //         // VERYIFY EXPECTATIONS
    //         expect(response.body.errors.length).toBe(3)
    //         expect(response.body.errors).toEqual([
    //             'An url is required.',
    //             'An author is required.',
    //             'A title is required.'
    //         ])
    //     })
    // })
})

// BLOG REMOVAL
// describe('Blog Removal', () => {
//     test('Removal of existing ID works', async() => {

//         // CREATE MOCK ENTRY
//         const entry = {
//             title: 'foo',
//             author: 'bar',
//             url: 'biz',
//             likes: 0
//         }

//         // CREATE BLOG
//         await create_blog(entry, response => {
//             expect(response.status).toBe(201)
            
//             // SAVE ID
//             entry.id = response.body.id
//         })
        
//         // MAKE SURE THE USER EXISTS
//         fetch_blog(entry.id, response => {
//             expect(response.status).toBe(200)

//             // VERYIFY EXPECTATIONS
//             expect(response.body).toEqual(entry)
//         })
        
//         // ATTEMPT TO REMOVE THE USER
//         await api
//             .delete(`/api/blogs/${ entry.id }`)
//             .send(entry)
//             .expect(204)

//         // MAKE SURE THE USER EXISTS
//         fetch_blog(entry.id, response => {
//             expect(response.status).toBe(404)

//             // VERYIFY EXPECTATIONS
//             expect(response.body.errors).toEqual([
//                 'ID does not exist.'
//             ])
//         })
//     })

//     test('Removal of non-existent ID fails correctly', async() => {

//         // FAKE ID
//         const fake_id = '111111111111111111111111'

//         // VERIFY ID EXISTENCE AGAIN
//         await api
//             .get(`/api/blogs/${ fake_id }`)
//             .expect(404)
//             .expect('Content-Type', 'application/json; charset=utf-8')
//             .expect(response => {

//                 // CHECK FOR A CORRECT ERROR
//                 expect(response.body.errors).toEqual([
//                     'ID does not exist.'
//                 ])
//             })
//     })
// })

// describe('Blog Updating', () => {
//     test('Updating of existing ID works', async() => {

//         // CREATE MOCK ENTRY
//         const entry = {
//             title: 'foo',
//             author: 'bar',
//             url: 'biz',
//             likes: 0
//         }

//         // CREATE BLOG
//         await create_blog(entry, response => {
//             expect(response.status).toBe(201)

//             // SAVE GENERATED ID
//             entry.id = response.body.id
//         })

//         // MAKE SURE THE USER EXISTS
//         await fetch_blog(entry.id, response => {
//             expect(response.status).toBe(200)

//             // VERYIFY EXPECTATIONS
//             expect(response.body).toEqual(entry)
//         })

//         // MODIFIABLE PROPERTY
//         const modified = {
//             likes: 15
//         }
        
//         // ATTEMPT TO UPDATE THE USER
//         await api
//             .put(`/api/blogs/${ entry.id }`)
//             .send(modified)
//             .expect(200)

//         // CHECK THE BLOG AGAIN
//         await fetch_blog(entry.id, response => {
//             expect(response.status).toBe(200)

//             // VERIFY THAT THE LIKES PROPERTY HAS BEEN UPDATED
//             expect(response.body.likes).toBe(modified.likes)
//         })
//     })

//     test('Updating of non-existent ID fails correctly', async() => {

//         // FAKE ID
//         const fake_id = '111111111111111111111111'

//         // MOCK DATA
//         const modified = {
//             likes: 15
//         }
        
//         // ATTEMPT TO UPDATE NONSENSE ID
//         await api
//             .put(`/api/blogs/${ fake_id }`)
//             .send(modified)
//             .expect(400)
//             .expect(response => {

//                 // VERIFY THAT THE ERROR MATCHES
//                 expect(response.body.errors).toEqual([
//                     'ID does not exist.'
//                 ])
//             })
//     })
// })

// CLOSE MONGOOSE CONNECTION AFTER
afterAll(() => {
    mongoose.connection.close()
}) 