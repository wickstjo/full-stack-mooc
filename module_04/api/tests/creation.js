const mongoose = require('mongoose')
const helpers = require('./helpers.js')
const mock_user = require('./mock/mock_user.json')
const mock_blog = require('./mock/mock_blog.json')

// CREATE A NEW USER & LOGIN TO CREATE A BEARER TOKEN
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

describe('Blog creation', () => {
    test('All props and invalid token fails', async() => {

        // CREATE A BLOG
        await helpers.create_blog(mock_blog, null, response => {
            expect(response.status).toBe(401)
            expect(response.body.errors).toEqual(['Invalid bearer token'])
        })
    })
})

// CLOSE MONGOOSE CONNECTION AFTER
afterAll(() => {
    mongoose.connection.close()
}) 