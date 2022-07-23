const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const env = require('dotenv').config().parsed
const endpoints = require('./endpoints.js')

// EXPRESS INSTANCE
const app = express()

// BASIC MIDDLEWARES
app.use(express.json())
app.use(cors())

// MORGAN MIDDLEWARE FOR LOGGING
morgan.token('body', (req) => { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))

// FETCHING
app.get('/api/persons', endpoints.fetch_people)
app.get('/api/persons/:id', endpoints.fetch_person)

// PERSON ACTIONS
app.post('/api/persons', endpoints.create_person)
app.delete('/api/persons/:id', endpoints.remove_person)
app.put('/api/persons/:id', endpoints.update_person)

// OTHER
app.get('/info', endpoints.records)

// LAUNCH API SERVER
app.listen(env.API_PORT, () => {
    console.log(`API SERVER RUNNING ON: http://localhost:${ env.API_PORT }/api/persons`)
})