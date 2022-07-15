const Book = require('../mongo/book.js')
const Author = require('../mongo/author.js')
const User = require('../mongo/user.js')

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'VERY_SECRET_KEY'

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

module.exports = {
    addBook: async (root, args) => {

        // FETCH OR CREATE AUTHOR
        const author_id = await generate_author_id(args.author)

        // CREATE THE BOOK -- PASS IN THE AUTHOR ID
        return await new Book({
            ...args,
            author: author_id
        }).save()
    },
    editBook: async (root, args) => {

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
    },
    editAuthor: async (root, args) => {
        await Author.updateOne({
            _id: args.id
        }, args, { runValidators: true })
    },
    registerUser: async (root, args) => {

        // CREATE USER
        const user = await new User({
            username: args.username,
            password: args.password,
            favoriteGenre: args.genre,
        }).save()

        // BREAK IF SOMETHING WENT WRONG
        if (!user) { return user }

        return {
            value: jwt.sign({
                username: user.username,
                id: user._id,
            }, JWT_SECRET)
        }
    }
}