import { gql } from '@apollo/client'

// BOOKS QUERY
const BOOKS = {
    key: 'books',
    query: gql(`
        query ($genre: String, $author: String) {
            books (genre: $genre, author: $author) {
                id
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

// BOOK QUERY
const BOOK = {
    key: 'book',
    query: gql(`
        query ($id: ID!) {
            book (id: $id) {
                id
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

// AUTHORS QUERY
const AUTHORS = {
    key: 'authors',
    query: gql(`
        query {
            authors {
                id
                name
                born
            }
        }
    `)
}

// SINGLE AUTHOR QUERY
const AUTHOR = {
    key: 'author',
    query: gql(`
        query ($id: ID!) {
            author (id: $id) {
                id
                name
                born
            }
        }
    `)
}

// USERS QUERY
const USERS = {
    key: 'users',
    query: gql(`
        query {
            users {
                username
                id
            }
        }
    `)
}

// SINGLE USER QUERY
const USER = {
    key: 'user',
    query: gql(`
        query ($id: ID!) {
            user (id: $id) {
                id
                favoriteGenre
                username
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

const update_user = gql(`
    mutation editUser(
        $id: ID!,
        $genre: String!,
    ) {
        editUser(
            id: $id,
            genre: $genre,
        ) {
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
            username
            id
            token
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
            username
            id
            token
        }
    }
`)

export {
    BOOKS,
    BOOK,
    create_book,
    update_book,
    
    AUTHORS,
    AUTHOR,
    update_author,

    USERS,
    USER,
    update_user,

    login,
    register,
}