const { UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('../mongo/book.js')
const Author = require('../mongo/author.js')
const User = require('../mongo/user.js')

const jwt = require('jsonwebtoken')
const config = require('../config.js')

// FETCH OR CREATE AUTHOR ID
const generate_author_id = async (name) => {

    // ATTEMPT TO FIND AUTHOR
    let author = await Author.findOne({
        name: name
    })

    // IF THE AUTHOR DOES NOT EXIST, CREATE IT
    if (!author) {

        // CREATE AUTHOR
        author = await new Author({
            name
        }).save()

        // PUSH ENTRY TO PUBSUB
        pubsub.publish('AUTHOR_ADDED', {
            authorAdded: author
        })
    }

    return author.id
}

// CREATE VALID AUTH TOKEN
const create_auth_token = async(user) => {
    return {
        username: user.username,
        id: user._id,
        token: jwt.sign({
            username: user.username,
            id: user._id,
        }, config.auth_secret),
    }
}

// VERIFY AUTH SESSION
const valid_session = (context, target_id=false) => {

    // THROW ERROR
    if (!context.session) {
        throw new AuthenticationError('A bearer token is required')
    }

    // IF THE TARGET ID DOESNT MATCH SESSION ID
    if (target_id && !(context.session.id === target_id)) {
        throw new AuthenticationError('Incorrect bearer token')
    }

    return true
}

module.exports = [{
    addBook: async (root, args, context) => {
        if (valid_session(context)) {

            // FETCH OR CREATE AUTHOR
            const author_id = await generate_author_id(args.author)

            // CREATE THE BOOK -- PASS IN THE AUTHOR ID
            const book = await new Book({
                ...args,
                author: author_id
            }).save()

            // PUSH ENTRY TO PUBSUB
            pubsub.publish('BOOK_ADDED', {
                bookAdded: book.populate('author', {
                    name: 1,
                    id: 1
                })
            })

            // ADD BOOK TO AUTHOR BOOKLIST
            await Author.updateOne(
                { _id: author_id },
                { $push: { books: book.id } }
            )

            return book
        }
    },
    editBook: async (root, args, context) => {
        if (valid_session(context)) {

            // MODIFY BOOK WITH MATCHING ID
            await Book.updateOne({
                _id: args.id
            }, args, { runValidators: true })

            const book = await Book.findById(args.id)

            // PUSH ENTRY TO PUBSUB
            pubsub.publish('BOOK_UPDATED', {
                bookUpdated: book.populate('author', {
                    name: 1,
                    id: 1
                })
            })

            return book
        }
    },
    editAuthor: async (root, args, context) => {
        if (valid_session(context)) {
            await Author.updateOne({
                _id: args.id
            }, args, { runValidators: true })

            const author = await Author.findById(args.id)

            // PUSH ENTRY TO PUBSUB
            pubsub.publish('AUTHOR_UPDATED', {
                authorUpdated: author.populate('books', {
                    title: 1,
                    published: 1,
                    id: 1
                })
            })

            return author
        }
    },
    editUser: async (root, args, context) => {
        if (valid_session(context, args.id)) {
            await User.updateOne({
                _id: args.id
            }, { favoriteGenre: args.genre }, { runValidators: true })

            const user = await User.findById(args.id)

            // PUSH ENTRY TO PUBSUB
            pubsub.publish('USER_UPDATED', {
                userUpdated: user
            })

            return user
        }
    },
    registerUser: async (root, args) => {

        // CREATE USER
        const user = await new User({
            username: args.username,
            password: args.password,
            favoriteGenre: args.genre,
        }).save()

        // BREAK IF SOMETHING WENT WRONG
        if (!user) {
            throw new UserInputError('Something went wrong, try again.')
        }

        // PUSH ENTRY TO PUBSUB
        pubsub.publish('USER_ADDED', {
            userAdded: user
        })

        // OTHERWISE, CREATE AUTH TOKEN
        return create_auth_token(user)
    },
    loginUser: async (root, args) => {

        // CREATE USER
        const user = await User.findOne({
            username: args.username,
            password: args.password,
        })

        // BREAK IF SOMETHING THE USER WASNT FOUND
        if (!user) {
            throw new UserInputError('Faulty username and password combination.')
        }

        // OTHERWISE, CREATE AUTH TOKEN
        return create_auth_token(user)
    }
},
{
    // SUBSCRIPTIONS
    bookAdded: { subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']) },
    bookUpdated: { subscribe: () => pubsub.asyncIterator(['BOOK_UPDATED']) },

    authorAdded: { subscribe: () => pubsub.asyncIterator(['AUTHOR_ADDED']) },
    authorUpdated: { subscribe: () => pubsub.asyncIterator(['AUTHOR_UPDATED']) },

    userAdded: { subscribe: () => pubsub.asyncIterator(['USER_ADDED']) },
    userUpdated: { subscribe: () => pubsub.asyncIterator(['USER_UPDATED']) },
}]