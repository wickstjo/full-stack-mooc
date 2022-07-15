const { UserInputError, AuthenticationError } = require('apollo-server')

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
        author = await new Author({
            name
        }).save()
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

module.exports = {
    addBook: async (root, args, context) => {
        if (valid_session(context)) {

            // FETCH OR CREATE AUTHOR
            const author_id = await generate_author_id(args.author)

            // CREATE THE BOOK -- PASS IN THE AUTHOR ID
            return await new Book({
                ...args,
                author: author_id
            }).save()
        }
    },
    editBook: async (root, args, context) => {
        if (valid_session(context)) {

            // FETCH OR CREATE AUTHOR
            const author_id = await generate_author_id(args.author)

            // FIXED MODIFICATIONS
            const modifications = {
                ...args,
                author: author_id
            }

            // MODIFY BOOK WITH MATCHING ID
            await Book.updateOne({
                _id: args.id
            }, modifications, { runValidators: true })
        }
    },
    editAuthor: async (root, args, context) => {
        if (valid_session(context)) {
            await Author.updateOne({
                _id: args.id
            }, args, { runValidators: true })
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

        // OTHERWISE, CREATE AUTH TOKEN
        return create_auth_token(user)
    },
    editUser: async (root, args, context) => {
        if (valid_session(context, args.id)) {
            await User.updateOne({
                _id: args.id
            }, { favoriteGenre: args.genre }, { runValidators: true })
        }
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
}