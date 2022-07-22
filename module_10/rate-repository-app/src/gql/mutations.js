import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation ($credentials: AuthenticateInput!) {
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`

export const REGISTER = gql`
    mutation ($user: CreateUserInput!) {
        createUser(user: $user) {
            id
        }
    }
`

export const ADD_REVIEW = gql`
    mutation ($review: CreateReviewInput!) {
        createReview(review: $review) {
            id
            repositoryId
        }
    }
`

export const REMOVE_REVIEW = gql`
    mutation ($deleteReviewId: ID!) {
        deleteReview(id: $deleteReviewId)
    }
`