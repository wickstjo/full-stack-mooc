const express = require('express')
const cors = require('cors')
const funcs = require('./funcs.js');

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
        response.json(result)
    })
})

// DELETE PERSON
app.delete('/api/persons/:id', (request, response) => {

    // FILTER OUT PERSON FROM DB
    const id = Number(request.params.id)
    db = db.filter(person => person.id !== id)

    // RESPOND WITH 204
    response.status(204).end()
})


// RUN SERVER
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})