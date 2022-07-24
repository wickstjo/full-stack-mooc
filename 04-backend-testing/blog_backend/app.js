const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
require('express-async-errors')
const config = require('./config.js')
const middlewares = require('./funcs/middlewares.js')
const log = require('./funcs/logger.js')

// API ENDPOINTS
const blog_router = require('./endpoints/blog_router.js')
const user_router = require('./endpoints/user_router.js')
const testing_router = require('./endpoints/testing_router.js')

// EXPRESS INSTANCE
const app = express()

// ATTEMPT TO CONNECT TO MONGO DB
mongoose.connect(config.mongo.uri).then(() => {
    log.info(`MONGO-DB CONNECTED ON PORT ${ config.mongo.port }`)

    // BASIC MIDDLEWARES
    app.use(express.json())
    app.use(cors())
    app.use(middlewares.request_tracker)

    // API ENDPOINTS
    app.use('/api/blogs', middlewares.token_extractor, blog_router)
    app.use('/api/users', user_router)
    app.use('/api/testing', testing_router)

    // ERROR HANDLER MIDDLEWARE
    app.use(middlewares.unknown_endpoint)
    app.use(middlewares.error_handler)

// LOG MONGO DB ERROR
}).catch(error => {
    log.info('COULD NOT CONNECT TO MONGO-DB')
    log.error(error)
})

module.exports = app