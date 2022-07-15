import { gql } from '@apollo/client'

// FETCH ALL BOOKS
const all_books = gql(`
    query {
        allBooks {
            id
            title
            published
        }
    }
`)

// FETCH ONE BOOKS
const one_book = (id) => {
    return gql(`
        query {
            findBook(id: "${ id }") {
                title
                published
                genres
                author {
                    name
                    id
                }
            }
        }
    `)
}

// CREATE BOOK
const create_book = gql(`
    mutation createBook(
        $title: String!,
        $published: Int!,
        $author: String!,
        $genres: [String!]!
    ) {
        addBook(
            title: $title,
            published: $published,
            author: $author,
            genres: $genres
        ) {
            id
        }
    }
`)

// UPDATE AUTHOR
const update_book = gql(`
    mutation editBook(
        $id: ID!,
        $title: String!,
        $published: Int!,
        $author: String!,
        $genres: [String!]!
    ) {
        editBook(
            id: $id,
            title: $title,
            published: $published,
            author: $author,
            genres: $genres
        ) {
            id
        }
    }
`)

// FETCH ALL AUTHORS
const all_authors = gql(`
    query {
        allAuthors {
            name
            born
            id
        }
    }
`)

// FETCH ONE AUTHOR
const one_author = (id) => {
    return gql(`
        query {
            findAuthor(id: "${ id }") {
                name
                born
            }
        }
    `)
}

// UPDATE AUTHOR
const update_author = gql(`
    mutation editAuthor(
        $id: ID!,
        $name: String!,
        $born: Int!
    ) {
        editAuthor(
            id: $id,
            name: $name,
            born: $born
        ) {
            id
        }
    }
`)

// FETCH ALL USERS
const all_users = gql(`
    query {
        allUsers {
            username
            id
        }
    }
`)

// LOGIN USER
const login = gql(`
    mutation loginUser(
        $username: String!,
        $password: String!
    ) {
        loginUser(
            username: $username,
            password: $password
        ) {
            value
        }
    }
`)

// REGISTER USER
const register = gql(`
    mutation registerUser(
        $username: String!,
        $genre: String!,
        $password: String!
    ) {
        registerUser(
            username: $username,
            genre: $genre,
            password: $password,
        ) {
            value
        }
    }
`)

export {
    all_books,
    one_book,
    create_book,
    update_book,
    all_authors,
    one_author,
    update_author,
    all_users,
    login,
    register,
}