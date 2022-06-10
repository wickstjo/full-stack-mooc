const mongoose = require('mongoose');
const env = require('dotenv').config().parsed;
const schemas = require('./schemas.js');

// CONSTRUCT MODEL FOR NOTE
const Person = mongoose.model('Person', schemas.person)

// CONNECT TO MONGO DB
const connect = () => {
    return mongoose.connect(`mongodb://${ env.MONGO_USER }:${ env.MONGO_PASS }@localhost:${ env.MONGO_PORT }`)
}

// COUNT RECORDS
const records = async(query={}) => {

    // CONNECT TO DB & PERFORM QUERY
    await connect()
    const data = await Person.count(query)

    // CLOSE THE CONNECTION & RETURN DATA
    mongoose.connection.close()
    return data
}

// FETCH ALL PEOPLE
const fetch_people = async(query={}) => {

    // CONNECT TO DB & PERFORM QUERY
    await connect()
    const data = await Person.find(query)

    // CLOSE THE CONNECTION & RETURN DATA
    mongoose.connection.close()
    return data
}

// FETCH SINGLE PERSON
const fetch_person = async(id) => {

    // CONNECT TO DB & PERFORM QUERY
    await connect()
    const data = await Person.findById(id)

    // CLOSE THE CONNECTION & RETURN DATA
    mongoose.connection.close()
    return data
}

// CREATE A NEW PERSON
const create_person = async(entry) => {

    // CONNECT TO DB
    await connect()
    
    // CREATE PERSON & PUSH TO DB
    const person = await new Person({
        name: entry.name,
        number: entry.number
    }).save()

    // CLOSE THE CONNECTION & RETURN NOTE
    mongoose.connection.close()
    return person
}

// REMOVE EXISTING PERSON
const remove_person = async(id) => {

    // CONNECT TO DB & DELETE BY ID
    await connect()
    const data = await Person.deleteOne({
        _id: id
    })

    // CLOSE THE CONNECTION & RETURN DATA
    mongoose.connection.close()
    return data
}

// REMOVE EXISTING PERSON
const update_person = async(id, person) => {

    // CONNECT TO DB & DELETE BY ID
    await connect()
    const data = await Person.updateOne({
        _id: id
    }, person)

    // CLOSE THE CONNECTION & RETURN DATA
    mongoose.connection.close()
    return data
}

module.exports = {
    records,
    fetch_people,
    fetch_person,
    create_person,
    remove_person,
    update_person
}