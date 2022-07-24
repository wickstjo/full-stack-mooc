const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user.js')

const jwt = require('jsonwebtoken')
const config = require('../config.js')

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
            const user = await new User({
                ...request.body,
                password: password_hash
            }).save()

            // TOKEN PARAMS
            const params = {
                username: user.username,
                id: user.id
            }

            // CREATE AN AUTH TOKEN
            const token = jwt.sign(params, config.auth_secret, {
                expiresIn: config.auth_lifespan
            })
            
            return response.status(201).send({
                user, token
            })
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

// LOGIN
router.post('/auth', async (request, response) => {
    
    // TRY TO FETCH USERN
    const user = await User.findOne({
        username: request.body.username
    })

    // COMPARE PASSWORDS IF THE USER EXISTS
    const matches = user ? await bcrypt.compare(request.body.password, user.password) : false
    
    // IF BOTH CHECK
    if (user && matches) {

        // TOKEN PARAMS
        const params = {
            username: user.username,
            id: user.id
        }

        // CREATE AN AUTH TOKEN
        const token = jwt.sign(params, config.auth_secret, {
            expiresIn: config.auth_lifespan
        })

        // RESPOND
        return response.status(200).send({
            token: token,
            username: user.username,
            id: user.id,
        })
    }

    // OTHERWISE, THROW ERROR
    response.status(401).json({
        errors: ['Username and password combination does not exist.']
    })
  
})

module.exports = router