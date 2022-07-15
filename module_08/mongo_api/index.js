const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server')

// SERVER CONFIG
const config = require('./config.js')

// GQL PARTS
const mutations = require('./gql/mutations.js')
const queries = require('./gql/queries.js')
const objects = require('./gql/objects.js')
const definitions = require('./gql/definitions.js')

// ATTEMPT TO CONNECT TO MONGO DB
mongoose.connect(config.mongo.uri).then(() => {
    console.log(`MONGO-DB CONNECTED ON PORT ${ config.mongo.port }`)

    // STITCH SERVER TOGETHER
    const server = new ApolloServer({
        typeDefs: definitions,
        resolvers: {
            Query: queries,
            Mutation: mutations,
            ...objects,
        },
    })

    // START SERVER
    server.listen().then(({ url }) => {
        console.log(`SERVER STARTED ON: ${ url }`)
    })

// LOG MONGO DB ERROR
}).catch(error => {
    console.log('COULD NOT CONNECT TO MONGO-DB')
    console.log(error)
})