import { gql } from '@apollo/client';

export const GET_REPOS = gql`
    query {
        repositories {
            edges {
                node {
                    id
                    name
                    ownerName
                    fullName
                    reviewCount
                    ratingAverage
                    forksCount
                    stargazersCount
                    description 
                    language
                    ownerAvatarUrl
                }
            }
        }
    }
`

export const GET_REPO = gql`
    query ($id: ID!) {
        repository(id: $id) {
            id
            ownerName
            fullName
            reviewCount
            ratingAverage
            forksCount
            stargazersCount
            language
            ownerAvatarUrl
            reviews {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`

export const GET_USERS = gql`
    query {
        users {
            edges {
                node {
                    id
                    username
                    createdAt
                }
            }
        }
    }
`