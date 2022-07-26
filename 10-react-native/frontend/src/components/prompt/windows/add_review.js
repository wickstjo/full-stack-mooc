import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-native'

import { ADD_REVIEW } from '../../../gql/mutations'
import Form from '../../inputs/form'
import useField from '../../../hooks/field'

export default () => {

    // AUXILLARY
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const navigator = useNavigate()

    // MUTATION
    const [createReview] = useMutation(ADD_REVIEW, {
        context: auth.header
    })

    const git_user = useField({
        placeholder: 'Who is the target github user?',
    })

    const git_repo = useField({
        placeholder: 'What is the target github repo?',
    })

    const description = useField({
        placeholder: 'What is your feedback?'
    })

    const rating = useField({
        placeholder: 'What rating do you want to assign?',
    })

    // TRIGGER FORM
    const trigger = async() => {

        // TYPECAST RATING
        const parsed_rating = Number(rating.value)

        if (isNaN(parsed_rating)) {
            return dispatch({
                type: 'notifications/negative',
                message: 'The rating must be numeric.'
            })
        }

        // CATCH VALIDATION ERRORS
        if (parsed_rating < 0 || parsed_rating > 100) {
            return dispatch({
                type: 'notifications/negative',
                message: 'The rating must be between 0 and 100.'
            })
        }

        // START AUTH PROCESS
        try {

            // ATTEMPT TO AUTHENTICATE
            const response = await createReview({
                variables: {
                    review: {
                        repositoryName: git_repo.value,
                        ownerName: git_user.value,
                        rating: parsed_rating,
                        text: description.value,
                    }
                }
            })

            // NOTIFY USER
            dispatch({
                type: 'notifications/positive',
                message: 'Review added!'
            })

            // REDIRECT TO NEW PAGE
            const created_id = response.data.createReview.repositoryId
            navigator(`/repos/${ created_id }`)

            // HIDE PROMPT
            dispatch({ type: 'prompts/hide' })
        
        // CATCH & RENDER ERRORS
        } catch (error) {
            dispatch({
                type: 'notifications/negative',
                message: error.graphQLErrors.map(item => item.message)
            })
        }
    }

    return (
        <Form
            header={ 'Add Review' }
            func={ trigger }
            fields={[ git_user, git_repo, description, rating ]}
            required={[ git_user, git_repo, rating ]}
            button={ 'Publish' }
        />
    )
}