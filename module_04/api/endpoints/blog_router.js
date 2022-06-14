const router = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const config = require('../config.js')

// VALIDATE & DECODE BEARER TOKEN
const validate_token = (request, response) => {
    const decoded_token = jwt.verify(request.bearer_token, config.auth_secret)

    // ATTACH TO REQUEST IF IT CHECKS OUT
    if (!decoded_token.id) {
        return response.status(401).send({
            errors: ['Bearer token is missing or invalid']
        })
    }

    return decoded_token.id
}

// FETCH ALL BLOGS
router.get('/', async (request, response) => {

    // FETCH & POPULATE USERS PROP
    const result = await Blog.find({}).populate('user', {
        username: 1,
        id: 1
    })

    response.status(200).send(result)
})

// FETCH SINGLE BLOG BY ID
router.get('/:id', async (request, response) => {

    // FETCH & POPULATE
    const entry = await Blog.findById(request.params.id).populate('user', {
        username: 1,
        id: 1
    })

    // PERSON FOUND
    if (entry) {
        return response.status(200).send(entry)
    }

    // OTHERWISE, THROW ERROR
    response.status(404).send({
        errors: ['ID does not exist.']
    })
})

// CREATE NEW BLOG
router.post('/', async (request, response) => {

    // VERIFY BEARER TOKEN
    const user_id = validate_token(request, response)

    // IF TOKEN IS VALID, CREATE BLOG
    const entry = await new Blog({
        ...request.body,
        user: user_id
    }).save()

    // UPDATE USER PROFILE
    const user = await User.findById(user_id)
    user.blogs = user.blogs.concat(entry._id)
    user.save()

    response.status(201).send(entry)
})

// DELETE BLOG BY ID
router.delete('/:id', async (request, response) => {

    // VERIFY BEARER TOKEN
    const user_id = validate_token(request, response)

    // BLUEPRINT QUERY
    const result = await Blog.deleteOne({
        _id: request.params.id,
        user: {
            _id: user_id
        }
    })

    // SOMETHING WAS ACTUALLY DELETED
    if (result.deletedCount > 0) {
        return response.status(204).end()
    }

    // OTHERWISE, SEND ERROR
    response.status(404).send({
        errors: ['ID does not exist.']
    })
})

// UPDATE BLOG BY ID
router.put('/:id', async (request, response) => {

    // VERIFY BEARER TOKEN
    const user_id = validate_token(request, response)

    // BLUEPRINT QUERY
    const result = await Blog.updateOne({
        _id: request.params.id,
        user: {
            _id: user_id
        }
    }, request.body)

    // ENTRY FOUND & MODIFIED
    if (result.modifiedCount === 1) {
        return response.status(200).end()
    }

    // OTHERWISE, THROW ERROR
    response.status(400).send({
        errors: ['ID does not exist.']
    })
})

module.exports = router