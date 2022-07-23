import { gql } from '@apollo/client'

const BOOK_DATA = `
    id
    title
    published
    genres
    author {
        name
        id
    }
`

const ADDED_FEED = {
    key: 'bookAdded',
    query: gql`
        subscription {
            bookAdded {
                ${ BOOK_DATA }
            }
        }
    `
}

const UPDATED_FEED = {
    key: 'bookUpdated',
    query: gql`
        subscription {
            bookUpdated {
                ${ BOOK_DATA }
            }
        }
    `
}

// BOOKS QUERY
const BOOKS = {
    key: 'books',
    query: gql(`
        query ($genre: String, $author: String) {
            books (genre: $genre, author: $author) {
                ${ BOOK_DATA }
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
                ${ BOOK_DATA }
            }
        }
    `)
}

const CREATE = gql(`
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

const UPDATE = gql(`
    mutation editBook(
        $id: ID!,
        $title: String!,
        $published: Int!,
        $genres: [String!]!
    ) {
        editBook(
            id: $id,
            title: $title,
            published: $published,
            genres: $genres
        ) {
            id
        }
    }
`)

export {
    ADDED_FEED,
    UPDATED_FEED,
    BOOKS,
    BOOK,
    CREATE,
    UPDATE,
}