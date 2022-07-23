import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'

import { REMOVE_REVIEW } from '../../../gql/mutations'
import Form from '../../inputs/form'

export default () => {

    // AUXILLARY
    const prompt = useSelector(state => state.prompts)
    const dispatch = useDispatch()

    // LOGIN MUTATION
    const [deleteReview] = useMutation(REMOVE_REVIEW)

    // TRIGGER FORM
    const trigger = async() => {
        try {

            await deleteReview({
                variables: {
                    deleteReviewId: prompt.review_id
                }
            })

            // NOTIFY USER & HIDE PROMPT
            dispatch({
                type: 'notifications/positive',
                message: 'Removed review!'
            })

            // REFETCH REVIEW DATA & CLOSE PROMPT
            prompt.refetch()
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
            header={ 'remove review' }
            func={ trigger }
            fields={[]}
            required={[]}
            button={ 'Confirm' }
        />
    )
}