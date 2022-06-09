const mongoose = require('mongoose');
const env = require('dotenv').config().parsed;
const schemas = require('./schemas.js');

// CONSTRUCT MODEL FOR NOTE
const Person = mongoose.model('Person', schemas.person)

// CONNECT TO MONGO DB
const connect = () => {
    return mongoose.connect(`mongodb://${ env.MONGO_USER }:${ env.MONGO_PASS }@localhost:${ env.MONGO_PORT }`)
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

module.exports = {
    fetch_people,
    create_person
}