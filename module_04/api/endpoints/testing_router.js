const router = require('express').Router()
const User = require('../models/user.js')
const Blog = require('../models/blog.js')

// ATTEMPT TO LOGIN
router.get('/reset', async (request, response) => {

    // NUKE BOTH TABLES
    await User.deleteMany({})
    await Blog.deleteMany({})

    response.status(200).end()
})

module.exports = router