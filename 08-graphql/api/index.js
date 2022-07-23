const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

// DATABASE STUFF
const db = require('./db.json')
let books = db.books
let authors = db.authors

// DEFINITIONS
const typeDefs = gql`
    type Author {
        name: String!
        born: Int
        bookCount: Int
        id: ID!
    }

    type Book {
        title: String!
        published: Int!
        author: String!
        id: ID!
        genres: [String!]!
    }

    type Query {
        authorCount: Int!
        bookCount: Int!

        allBooks(author: String, genre: String): [Book!]!
        findBook(id: ID!): Book
        
        allAuthors: [Author!]!
        findAuthor(id: ID!): Author
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book

        editBook(
            id: ID!
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book

        editAuthor(
            id: ID!
            name: String!
            born: Int!
        ): Author
    }
`

// API ENDPOINTS
const queries = {

    // COUNTS
    bookCount: () => books.length,
    authorCount: () => authors.length,

    // BOOK QUERIES
    allBooks: (root, args) => {

        // FILTER BY BOTH ARGS
        if (args.author && args.genre) {
            return books.filter(book => book.author === args.author && book.genres.includes(args.genre))
        }

        // FILTER BY AUTHOR
        if (args.author) {
            return books.filter(book => book.author === args.author)
        }

        // FILTER BY GENRE
        if (args.genre) {
            return books.filter(book => book.genres.includes(args.genre))
        }

        // OTHERWISE, RETURN ALL BOOKS
        return books
    },
    findBook: (root, args) => books.find(book => book.id === args.id),

    // AUTHOR QUERIES
    allAuthors: () => authors,
    findAuthor: (root, args) => authors.find(author => author.id === args.id),
}

// CUSTOM OBJECT PROPS
const custom_props = {
    Author: {
        bookCount: (root) => books.filter(book => book.author === root.name).length,
    }
}

// MUTATING ACTIONS
const actions = {
    addBook: (root, args) => {

        // CREATE BOOK OBJECT
        const book = {
            ...args,
            id: uuid()
        }

        // PUSH TO CONTAINER & RETURN
        books.push(book)

        // CHECK IF THE AUTHOR EXISTS
        const exists = authors.find(author => author.name === args.author)

        // IF THEY DONT, CREATE THEM
        if (!exists) {
            authors.push({
                name: args.author,
                id: uuid(),
            })
        }

        return book
    },
    editBook: (root, args) => {

        // ATTEMPT TO FIND THE PERSON
        const target = books.findIndex(book => book.id === args.id)

        // ABORT IF AUTHOR WAS NOT FOUND
        if (target === -1) { return null }

        // OTHERWISE, OVERWRITE BIRTHYEAR
        books[target] = {
            ...books[target],
            ...args
        }

        return books[target]
    },
    editAuthor: (root, args) => {

        // ATTEMPT TO FIND THE PERSON
        const target = authors.findIndex(author => author.id === args.id)

        // ABORT IF AUTHOR WAS NOT FOUND
        if (target === -1) { return null }

        // OTHERWISE, OVERWRITE BIRTHYEAR
        authors[target] = {
            ...authors[target],
            ...args
        }

        return authors[target]
    }
}


// STITCH SERVER TOGETHER
const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query: queries,
        ...custom_props,
        Mutation: actions
    },
})

// START SERVER
server.listen().then(({ url }) => {
    console.log(`SERVER READY AT: ${ url }`)
})