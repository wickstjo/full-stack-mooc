const mongoose = require('mongoose')
const Person = require('./person.js')

// CONNECT TO MONGO DB
mongoose.connect(process.env.MONGO_URI)

// COUNT RECORDS
const records = async (request, response, next) => {
    try {

        // FETCH RECORD DATA
        const num_records = await Person.count({})
        return response.status(200).send(
            `Phonebook has info of ${ num_records } people.<br><br>${ Date() }`
        )

    // PIPE ERRORS
    } catch(error) { next(error) }
}

// FETCH ALL PEOPLE
const fetch_people = async (request, response, next) => {
    try {
        
        // FETCH ALL PEOPLE
        const people = await Person.find({})
        return response.status(200).send(people)        

    // PIPE ERRORS
    } catch(error) { next(error) }
}

// FETCH SINGLE PERSON
const fetch_person = async (request, response, next) => {
    try {
    
        // ATTEMPT TO FIND PERSON
        const person = await Person.findById(request.params.id)

        // NOT FOUND
        if (!person) {
            return response.status(404).send({
                errors: ['This person does not exist']
            })
        }

        return response.status(200).send(person)

    // PIPE ERRORS
    } catch(error) { next(error) }
}

// CREATE A NEW PERSON
const create_person = async (request, response, next) => {
    try {
    
        // ATTEMPT TO CREATE PERSON
        const person = await new Person({
            name: request.body.name,
            number: request.body.number
        }).save()

        return response.status(201).json(person)

    // PIPE ERRORS
    } catch(error) { next(error) }
}

// REMOVE EXISTING PERSON
const remove_person = async (request, response, next) => {
    try {
    
        // ATTEMPT TO REMOVE
        const result = await Person.deleteOne({
            _id: request.params.id
        })

        // IF SOMETHING WASNT ACTUALLY REMOVED
        if (result.deletedCount !== 1) {
            return response.status(400).send({
                errors: ['Nothing was removed']
            })
        }

        return response.status(204).end()

    // PIPE ERRORS
    } catch(error) { next(error) }
}

// REMOVE EXISTING PERSON
const update_person = async (request, response, next) => {
    try {

        // CONSTRUCT PERSON
        const person = {
            name: request.body.name,
            number: request.body.number
        }
    
        // VALIDATE & UPDATE
        await Person.updateOne({
            _id: request.params.id
        }, person, {
            runValidators: true
        })

        // RETURN THE UPDATED PERSON
        const updated = await Person.findById(request.params.id)
        response.status(200).send(updated)

    // PIPE ERRORS
    } catch(error) { next(error) }
}

module.exports = {
    records,
    fetch_people,
    fetch_person,
    create_person,
    remove_person,
    update_person
}