import { gql } from '@apollo/client'

const AUTH_DATA = `
    username
    id
    token
`

const LOGIN = gql(`
    mutation loginUser(
        $username: String!,
        $password: String!
    ) {
        loginUser(
            username: $username,
            password: $password
        ) {
            ${ AUTH_DATA }
        }
    }
`)

const REGISTER = gql(`
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
            ${ AUTH_DATA }
        }
    }
`)

export {
    LOGIN,
    REGISTER
}