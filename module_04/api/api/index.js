const express = require('express')
const cors = require('cors')
const env = require('dotenv').config().parsed
const funcs = require('./funcs.js')
const middlewares = require('./middlewares.js')

// EXPRESS INSTANCE
const app = express()

// BASIC MIDDLEWARES
app.use(express.json())
app.use(cors())

// FETCH ENDPOINTS
app.get('/api/persons', funcs.fetch_people)
app.get('/api/persons/:id', funcs.fetch_person)

// CREATE/REMOVE ENDPOINTS
app.post('/api/persons', funcs.create_person)
app.delete('/api/persons/:id', funcs.remove_person)

// OTHER ENDPOINTS
app.put('/api/persons/:id', funcs.update_person)
app.get('/info', funcs.records)

// ERROR HANDLER MIDDLEWARE
app.use(middlewares.error_handler)

// LAUNCH API SERVER
app.listen(env.API_PORT, () => {
    console.log(`Server running on port ${ env.API_PORT }`)
})