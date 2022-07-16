import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'

import { UPDATE } from '../../../gql/book'
import { Form, useField } from '../../inputs'

const UpdateBook = () => {

    // AUXILLARY
    const { prompts, auth } = useSelector(state => state)
    const dispatch = useDispatch()
    
    // CREATE BOOK
    const [editBook] = useMutation(UPDATE, {
        context: auth.header
    })

    // TITLE FIELD
    const title = useField({
        placeholder: 'What is the title?',
        default_value: prompts.book.title,
    })

    // PUBLISHED FIELD
    const published = useField({
        placeholder: 'When was it published?',
        default_value: prompts.book.published,
        type: 'number'
    })

    // PUBLISHED FIELD
    const genres = useField({
        placeholder: 'Under what genre?',
        default_value: prompts.book.genres.join(','),
    })

    // TRIGGER FORM
    const trigger = async () => {

        // ATTEMPT TO UPDATE BOOK
        try {
            await editBook({
                variables: {
                    id: prompts.id,
                    title: title.value,
                    published: Number(published.value),
                    genres: genres.value.split(','),
                }
            })

            // NOTIFY SUCCESS
            dispatch({
                type: 'notifications/positive',
                message: 'Book updated!'
            })

            // REDIRECT TO BOOK PAGE & HIDE PROMPT
            dispatch({ type: 'prompts/hide' })
        
        // CATCH & RENDER VALIDATION ERRORS
        } catch (error) {
            dispatch({
                type: 'notifications/negative',
                message: error.graphQLErrors.map(item => item.message)
            })
        }
    }

    return (
        <Form
            header={ 'update book' }
            func={ trigger }
            fields={[ title, published, genres ]}
            button={{
                label: 'update',
                required: [ title, published, genres ]
            }}
        />
    )
}

export default UpdateBook