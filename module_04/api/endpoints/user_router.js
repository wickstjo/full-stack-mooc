const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user.js')

// FETCH ALL USERS
router.get('/', async (request, response) => {

    // FETCH & POPULATE
    const result = await User.find({})
        .populate('blogs', {
            user: 0,
        })

    response.status(200).send(result)
})

// FETCH USER BY ID
router.get('/:id', async (request, response) => {

    // FETCH & POPULATE
    const entry = await User.findById(request.params.id)
        .populate('blogs', {
            user: 0,
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

// CREATE NEW USER
router.post('/', async (request, response) => {

    // IF A USERNAME AND VALID PASSWORD IS PROVIDED
    if (request.body.password && request.body.username) {
        if (request.body.password.length >= 3) {

            // HASH THE PASSWORD
            const n_salts = 10
            const password_hash = await bcrypt.hash(request.body.password, n_salts)
        
            // CREATE THE USER
            const entry = await new User({
                ...request.body,
                password: password_hash
            }).save()
            
            return response.status(201).send(entry)
        }

        // TOO SHORT PASSWORD ERROR
        return response.status(400).send({
            errors: ['A password must be at least 3 characters.']
        })
    }

    // OTHERWISE, THROW ERROR
    response.status(400).send({
        errors: ['A username and password is required.']
    })
})

module.exports = router