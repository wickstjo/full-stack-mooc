const express = require('express')
const cors = require('cors')
const funcs = require('./funcs.js');
const env = require('dotenv').config().parsed;

// EXPRESS INSTANCE
const app = express()

// EXPRESS MIDDLEWARES
app.use(express.json())
app.use(cors())

// FETCH ALL PEOPLE
app.get('/api/persons', (request, response) => {
    funcs.fetch_people().then(people => {
        response.send(people)
    }).catch(error => {
        response.status(404).end()
    })
})

// FETCH SPECIFIC PERSON BY ID
app.get('/api/persons/:id', (request, response) => {
    funcs.fetch_people({
        _id: request.params.id
    }).then(people => {
        response.send(people)
    }).catch(error => {
        response.status(404).end()
    })
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
    }).catch(error => {
        response.status(500).end()
    })
})

// DELETE PERSON FROM DB
app.delete('/api/persons/:id', (request, response) => {
    funcs.remove_person(request.params.id).then(result => {
        response.status(204).end()
    }).catch(error => {
        response.status(500).end()
    })
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
    }).catch(error => {
        response.status(500).end()
    })
})

// RUN SERVER
app.listen(env.API_PORT, () => {
    console.log(`Server running on port ${ env.API_PORT }`)
})