const express = require('express')
const cors = require('cors')

// IMPORT HELPER FUNCS
const { validate_props, create_id, random_id } = require('./funcs.js')

// EXPRESS INSTANCE
const app = express()

// EXPRESS MIDDLEWARES
app.use(express.json())
app.use(cors())

// INFO GATEWAY
// app.get('/info', (request, response) => {
    
//     // CONSTRUCT MESSAGES
//     const message = `The phonebook has info about ${ db.length } people.`
//     const date = '<br><br>' + Date();

//     response.send(message + date)
// })

// FETCH ALL PEOPLE
app.get('/api/persons', (request, response) => {
    response.send(db)
})

// FETCH SPECIFIC PERSON
app.get('/api/persons/:id', (request, response) => {

    // FIND PERSON VIA ID
    const id = Number(request.params.id)
    const note = db.find(person => person.id === id)
    
    // PERSON FOUND
    if (note) {
        response.json(note)

    // OTHERWISE, 404
    } else { response.status(404).end() } 
})

// ADD PERSON TO DB
app.post('/api/persons', (request, response) => {

    // VALIDATE PASSED PARAMS
    const params = request.body
    const validation_errors = validate_props(['name', 'number'], params, db)

    // IF VALIDATION ERRORS WERE FOUND, RETURN THEM
    if (validation_errors.length > 0) {
        return response.status(400).json({
            error: validation_errors
        })
    }

    // OTHERWISE, CONSTRUCT PERSON
    const person = {
        id: random_id(),
        name: params.name,
        number: params.number
    }

    // PUSH PERSON TO DB & RESPOND
    db.push(person)
    response.json(person)
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