import { gql } from '@apollo/client'

const USER_DATA = `
    id
    favoriteGenre
    username
`

const ADDED_FEED = {
    key: 'userAdded',
    query: gql`
        subscription {
            userAdded {
                ${ USER_DATA }
            }
        }
    `
}

const UPDATED_FEED = {
    key: 'userUpdated',
    query: gql`
        subscription {
            userUpdated {
                ${ USER_DATA }
            }
        }
    `
}

const USERS = {
    key: 'users',
    query: gql(`
        query {
            users {
                ${ USER_DATA }
            }
        }
    `)
}

const USER = {
    key: 'user',
    query: gql(`
        query ($id: ID!) {
            user (id: $id) {
                ${ USER_DATA }
            }
        }
    `)
}

const UPDATE = gql(`
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

export {
    ADDED_FEED,
    UPDATED_FEED,
    USERS,
    USER,
    UPDATE,
}