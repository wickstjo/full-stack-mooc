const mongoose = require('mongoose')
const env = require('dotenv').config().parsed
const { Person } = require('./schemas.js')

// CONNECT TO MONGO DB
mongoose.connect(`mongodb://${ env.MONGO_USER }:${ env.MONGO_PASS }@localhost:${ env.MONGO_PORT }`)

// COUNT RECORDS
const records = (request, response, next) => {
    return Person.count({}).then(count => {
        response.status(200).send(
            `Phonebook has info of ${ count } people.<br><br>${ Date() }`
        )
    }).catch(error => next(error))
}

// FETCH ALL PEOPLE
const fetch_people = (request, response, next) => {
    Person.find({}).then(people => {
        response.status(200).send(people)

    }).catch(error => next(error))
}

// FETCH SINGLE PERSON
const fetch_person = (request, response, next) => {
    Person.findById(request.params.id).then(person => {

        // PERSON FOUND
        if (person) {
            response.status(200).send(person)

        // OTHERWISE, 404
        } else {
            response.status(404).end()
        }

    }).catch(error => next(error))
}

// CREATE A NEW PERSON
const create_person = (request, response, next) => {

    // CREATE BLUEPRINT QUERY
    const query = new Person({
        name: request.body.name,
        number: request.body.number
    }).save()

    // EXECUTE IT
    query.then(result => {
        response.status(201).json(result)

    }).catch(error => next(error))
}

// REMOVE EXISTING PERSON
const remove_person = (request, response, next) => {
    Person.deleteOne({ _id: request.params.id }).then(result => {

        // SOMETHING WAS ACTUALLY DELETED
        if (result.deletedCount > 0) {
            response.status(204).end()
        
        // OTHERWISE, SEND ERROR
        } else {
            response.status(404).send({
                errors: ['This ID does not exist.']
            })
        }
    }).catch(error => next(error))
}

// REMOVE EXISTING PERSON
const update_person = (request, response, next) => {
    
    // CONSTRUCT PERSON
    const person = {
        name: request.body.name,
        number: request.body.number
    }
    
    return Person.updateOne({ _id: request.params.id }, person).then(() => {
        response.status(200).end()

    }).catch(error => next(error))
}

module.exports = {
    records,
    fetch_people,
    fetch_person,
    create_person,
    remove_person,
    update_person
}