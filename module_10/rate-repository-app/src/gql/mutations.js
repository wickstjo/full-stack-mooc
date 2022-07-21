import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation ($credentials: AuthenticateInput!) {
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`

export const ADD_REVIEW = gql`
    mutation ($review: CreateReviewInput!) {
        createReview(review: $review) {
            id
        }
    }
`