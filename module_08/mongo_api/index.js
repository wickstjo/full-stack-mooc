const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server')
const jwt = require('jsonwebtoken')
const config = require('./config.js')

const User = require('./mongo/user.js')

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
        context: async ({ req }) => {

            // CHECK FOR AUTH HEADER
            const auth = req ? req.headers.authorization : null

            // IF IT EXISTS AND IS FORMATTED CORRECTLY
            if (auth && auth.toLowerCase().startsWith('bearer ')) {

                // DECODE THE TOKEN & FIND THE USER
                const decoded = jwt.verify(auth.substring(7), config.auth_secret)
                const user = await User.findById(decoded.id)
                
                return {
                    session: user
                }
            }
        }
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