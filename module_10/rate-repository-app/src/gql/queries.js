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