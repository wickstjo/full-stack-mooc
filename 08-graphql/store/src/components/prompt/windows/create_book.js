import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { CREATE } from '../../../gql/book'
import { Form, useField } from '../../inputs'

const CreateBook = () => {

    // REDUX DISPATCH
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigator = useNavigate()

    // CREATE BOOK
    const [createBook] = useMutation(CREATE, {
        context: auth.header
    })

    // TITLE
    const title = useField({
        placeholder: 'What is the title?'
    })

    // AUTHOR FIELD
    const author = useField({
        placeholder: 'Who is the author?'
    })

    // PUBLICATION YEAR
    const published = useField({
        placeholder: 'What year was it published?',
        type: 'number'
    })

    // PUBLICATION YEAR
    const genres = useField({
        placeholder: 'Under what genres?'
    })

    // TRIGGER FORM
    const trigger = async() => {

        // ATTEMPT TO CREATE THE BOOK
        try {
            const response = await createBook({
                variables: {
                    title: title.value,
                    published: Number(published.value),
                    author: author.value,
                    genres: genres.value.split(','),
                }
            })

            // NOTIFY SUCCESS
            dispatch({
                type: 'notifications/positive',
                message: 'Book created!'
            })

            // REDIRECT TO BOOK PAGE
            navigator(`/books/${ response.data.addBook.id }`)

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
            header={ 'create new book' }
            func={ trigger }
            fields={[ title, author, published, genres ]}
            button={{
                label: 'create',
                required: [ title, author, published, genres ]
            }}
        />
    )
}

export default CreateBook