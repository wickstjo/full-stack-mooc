let people = require('../db.json')
const { v1: uuid } = require('uuid')

// COUNT RECORDS
const records = (request, response) => {
    response.status(200).send(
        `Phonebook has info of ${ people.length } people.<br><br>${ Date() }`
    )
}

// FETCH ALL PEOPLE
const fetch_people = (request, response) => {
    response.status(200).send(people)
}

// FETCH SINGLE PERSON
const fetch_person = (request, response) => {
    
    // FIND PERSON
    const person = people.find(
        person => person.id === request.params.id
    )

    // IF THE PERSON DOESNT EXIST
    if (!person) {
        return response.status(404).send({
            errors: ['This person does not exist']
        })
    }

    // OTHERWISE, RETURN THEM
    return response.status(200).send(person)
}

// CREATE A NEW PERSON
const create_person = (request, response) => {

    // IF PARAMS ARE MISSING
    if (!request.body.name || !request.body.number) {
        return response.status(400).send({
            errors: ['A name and number is required']
        })
    }

    // IF THE NAME ALREADY EXISTS
    if (people.find(person => person.name === request.body.name)) {
        return response.status(400).send({
            errors: ['This name already exists']
        })
    }

    // CREATE PERSON
    const person = {
        name: request.body.name,
        number: request.body.number,
        id: uuid(),
    }

    // PUSH NEW PERSON TO STATE & RESPOND
    people.push(person)
    return response.status(201).send(person)
}

// REMOVE EXISTING PERSON
const remove_person = (request, response) => {

    // FIND PERSON
    const person = people.find(
        person => person.id === request.params.id
    )

    // IF THEY DONT EXIST
    if (!person) {
        return response.status(404).send({
            errors: ['This person does not exist']
        })
    }

    // OTHERWISE, FILTER THEM OUT
    people = people.filter(person => person.id !== request.params.id)
    return response.status(204).send(person)
}

// REMOVE EXISTING PERSON
const update_person = (request, response) => {
    
    // FIND PERSON
    const target = people.findIndex(
        person => person.id === request.params.id
    )

    // IF THEY DONT EXIST, RETURN ERROR
    if (target === -1) {
        return response.status(404).send({
            errors: ['This person does not exist']
        })
    }

    // CREATE MODIFICATION BODY
    const modifications = {}
    if (request.body.name) { modifications.name = request.body.name }
    if (request.body.number) { modifications.number = request.body.number }

    // MELD OLD AND NEW
    people[target] = {
        ...people[target],
        ...modifications
    }

    return response.status(200).send(people[target])
}

module.exports = {
    records,
    fetch_people,
    fetch_person,
    create_person,
    remove_person,
    update_person
}