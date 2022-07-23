const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user.js')
const config = require('../config.js');

// ATTEMPT TO LOGIN
router.post('/', async (request, response) => {
    
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
            id: user._id
        }

        // TOKEN LIFESPAN -- IN SECONDS
        const lifespan = {
            expiresIn: 60*60
        }

        // CREATE AN AUTH TOKEN
        const token = jwt.sign(params, config.auth_secret, lifespan)

        // RESPOND
        return response.status(200).send({
            token,
            username: user.username,
            id: user.id
        })
    }

    // OTHERWISE, THROW ERROR
    response.status(401).json({
        errors: ['Username and password combination does not exist.']
    })
  
})

module.exports = router