const { gql } = require('apollo-server')

module.exports = gql(`
    type Author {
        name: String!
        born: Int
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
        favoriteGenre: String!
        id: ID!
    }
      
    type Token {
        token: String!
        username: String!
        id: ID!
    }

    type Query {
        authorCount: Int!
        bookCount: Int!
        userCount: Int!

        books(author: String, genre: String): [Book!]!
        book(id: ID!): Book
        
        authors: [Author!]!
        author(id: ID!): Author

        users: [User!]!
        user(id: ID!): User
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
        
        addAuthor(
            name: String!
            born: Int
        ): Author

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

        editUser(
            id: ID!
            genre: String!
        ): User

        loginUser(
            username: String!
            password: String!
        ): Token
    }
`)