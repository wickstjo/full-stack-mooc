const { gql } = require('apollo-server')

module.exports = gql(`
    type Author {
        name: String!
        born: Int
        bookCount: Int
        id: ID!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type User {
        username: String!
        favouriteGenre: String!
        id: ID!
    }
      
    type Token {
        value: String!
    }

    type Query {
        authorCount: Int!
        bookCount: Int!
        userCount: Int!

        allBooks(author: String, genre: String): [Book!]!
        findBook(id: ID!): Book
        
        allAuthors: [Author!]!
        findAuthor(id: ID!): Author

        allUsers: [User!]!
        findUser(id: ID!): User

        me: User
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book

        addAuthor(
            name: String!
            born: Int
        ): Author

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
            born: Int
        ): Author

        registerUser(
            username: String!
            password: String!
            genre: String!
        ): Token
    }
`)