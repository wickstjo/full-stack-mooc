import { gql } from '@apollo/client'

const AUTHOR_DATA = `
    id
    name
    born
    books {
        id
        published
        title
    }
`

const ADDED_FEED = {
    key: 'authorAdded',
    query: gql`
        subscription {
            authorAdded {
                ${ AUTHOR_DATA }
            }
        }
    `
}

const UPDATED_FEED = {
    key: 'authorUpdated',
    query: gql`
        subscription {
            authorUpdated {
                ${ AUTHOR_DATA }
            }
        }
    `
}

const AUTHORS = {
    key: 'authors',
    query: gql(`
        query {
            authors {
                ${ AUTHOR_DATA }
            }
        }
    `)
}

const AUTHOR = {
    key: 'author',
    query: gql(`
        query ($id: ID!) {
            author (id: $id) {
                ${ AUTHOR_DATA }
            }
        }
    `)
}

const UPDATE = gql(`
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

export {
    ADDED_FEED,
    UPDATED_FEED,
    AUTHORS,
    AUTHOR,
    UPDATE,
}