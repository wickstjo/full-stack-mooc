const express = require('express')
const cors = require('cors')
const env = require('dotenv').config().parsed;
const funcs = require('./funcs.js');
const middlewares = require('./middlewares.js');

// EXPRESS INSTANCE
const app = express()

// EXPRESS MIDDLEWARES
app.use(express.json())
app.use(cors())

// FETCH ALL PEOPLE
app.get('/api/persons', (request, response) => {
    funcs.fetch_people().then(people => {
        response.status(200).send(people)
    }).catch(error => {
        response.status(404).end()
    })
})

// FETCH SPECIFIC PERSON BY ID
app.get('/api/persons/:id', (request, response, next) => {
    funcs.fetch_person(request.params.id).then(person => {

        // PERSON FOUND
        if (person) {
            response.status(200).send(person)

        // OTHERWISE, 404
        } else {
            response.status(404).end()
        }

    }).catch(error => next(error))
})

// ADD PERSON TO DB
app.post('/api/persons', (request, response) => {

    // CONSTRUCT PERSON
    const person = {
        name: request.body.name,
        number: request.body.number
    }

    // CREATE THE PERSON IN DB
    funcs.create_person(person).then(result => {
        response.status(201).json(result)
    }).catch(error => next(error))
})

// DELETE PERSON FROM DB
app.delete('/api/persons/:id', (request, response) => {
    funcs.remove_person(request.params.id).then(result => {
        response.status(204).end()
    }).catch(error => next(error))
})

// UPDATE EXISTING PERSON IN DB
app.put('/api/persons/:id', (request, response) => {

    // CONSTRUCT PERSON
    const person = {
        name: request.body.name,
        number: request.body.number
    }

    // UPDATE PERSON
    funcs.update_person(request.params.id, person).then(result => {
        response.status(200).end()
    }).catch(error => next(error))
})

// API INFO
app.get('/info', (request, response) => {
    funcs.records().then(count => {
        response.status(200).send(`Phonebook has info of ${ count } people.<br><br>${ Date() }`)
    }).catch(error => next(error))
})

// ADD ERROR HANDLER MIDDLEWARE
app.use(middlewares.error_handler)

// LAUNCH API SERVER
app.listen(env.API_PORT, () => {
    console.log(`Server running on port ${ env.API_PORT }`)
})