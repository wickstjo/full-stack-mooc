const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const config = require('./config.js')
const middlewares = require('./funcs/middlewares.js')
const router = require('./api/router.js')
const log = require('./funcs/logger.js')

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
    app.use('/api/blogs', router)

    // ERROR HANDLER MIDDLEWARE
    app.use(middlewares.unknown_endpoint)
    app.use(middlewares.error_handler)

// LOG MONGO DB ERROR
}).catch(error => {
    log.info('COULD NOT CONNECT TO MONGO-DB')
    log.error(error)
})

module.exports = app