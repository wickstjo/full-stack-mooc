const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const http = require('http')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')

const jwt = require('jsonwebtoken')
const config = require('./config.js')
const mongoose = require('mongoose')
const User = require('./mongo/user.js')

// GQL PARTS
const [mutations, subscriptions] = require('./gql/mutations.js')
const queries = require('./gql/queries.js')
const definitions = require('./gql/definitions.js')

// ATTEMPT TO CONNECT TO MONGO DB
mongoose.connect(config.mongo.uri).then(() => {
    console.log(`MONGO-DB CONNECTED ON PORT ${ config.mongo.port }`)
}).catch(error => {
    console.log('COULD NOT CONNECT TO MONGO-DB')
    console.log(error)
})

const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)

    const schema = makeExecutableSchema({
        typeDefs: definitions,
        resolvers: {
            Query: queries,
            Mutation: mutations,
            Subscription: subscriptions,
        }
    })

    const subscriptionServer = SubscriptionServer.create({
        schema,
        execute,
        subscribe,
    },{
        server: httpServer,
        path: '',
    })

    const server = new ApolloServer({
        schema,
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
        },
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }), {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close()
                        },
                    }
                },
            }
        ],
    })

    await server.start()

    server.applyMiddleware({
        app,
        path: '/',
    })

    const PORT = 4000

    httpServer.listen(PORT, () =>
        console.log(`Server is now running on http://localhost:${ PORT }`)
    )
}

start()