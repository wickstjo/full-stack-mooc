const mongoose = require('mongoose');
const env = require('dotenv').config().parsed;
const schemas = require('./schemas.js');

// CONSTRUCT MODEL FOR NOTE
const Person = mongoose.model('Person', schemas.person)

// CONNECT TO MONGO DB
const connect = (args) => {
    return mongoose.connect(`mongodb://${ env.MONGO_USER }:${ args[0] }@localhost:${ env.MONGO_PORT }`)
}

// FETCH ALL PEOPLE
const fetch_people = async(args) => {

    // CONNECT TO DB & PERFORM QUERY
    await connect(args)
    const data = await Person.find({})

    // CLOSE THE CONNECTION & RETURN DATA
    mongoose.connection.close()
    return data
}

// CREATE A NEW PERSON
const create_person = async(args) => {

    // CONNECT TO DB
    await connect(args)
    
    // CREATE PERSON & PUSH TO DB
    const person = await new Person({
        name: args[1],
        number: args[2]
    }).save()

    // CLOSE THE CONNECTION & RETURN NOTE
    mongoose.connection.close()
    return person
}

module.exports = {
    fetch_people,
    create_person
}