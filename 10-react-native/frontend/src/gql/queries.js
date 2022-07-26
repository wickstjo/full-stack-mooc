import { gql } from '@apollo/client';

export const GET_REPOS = gql`
    query ($first: Int, $after: String) {
        repositories(first: $first, after: $after) {
            totalCount
            edges {
                node {
                    id
                    name
                    ownerName
                    fullName
                    reviewCount
                    ratingAverage
                    createdAt
                    forksCount
                    stargazersCount
                    description 
                    language
                    ownerAvatarUrl
                }
                cursor
            }
            pageInfo {
                endCursor
                startCursor
                hasNextPage
            }
        }
    }
`


// export const GET_REPOS = gql`
//     query {
//         repositories {
//             edges {
//                 node {
//                     id
//                     name
//                     ownerName
//                     fullName
//                     reviewCount
//                     ratingAverage
//                     createdAt
//                     forksCount
//                     stargazersCount
//                     description 
//                     language
//                     ownerAvatarUrl
//                 }
//             }
//         }
//     }
// `

export const GET_REPO = gql`
    query ($id: ID!, $first: Int, $after: String) {
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
            reviews (first: $first, after: $after) {
                totalCount
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
                    cursor
                }
                pageInfo {
                    endCursor
                    hasNextPage
                    startCursor
                }
            }
        }
    }
`

// export const GET_REPO = gql`
//     query ($id: ID!) {
//         repository(id: $id) {
//             id
//             ownerName
//             fullName
//             reviewCount
//             ratingAverage
//             forksCount
//             stargazersCount
//             language
//             ownerAvatarUrl
//             reviews {
//                 edges {
//                     node {
//                         id
//                         text
//                         rating
//                         createdAt
//                         user {
//                             id
//                             username
//                         }
//                     }
//                 }
//             }
//         }
//     }
// `

export const MY_REVIEWS = gql`
    query getCurrentUser($includeReviews: Boolean=true) {
        me {
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        repositoryId
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