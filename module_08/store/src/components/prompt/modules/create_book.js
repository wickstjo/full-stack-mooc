import { Form, useField } from '../../inputs'
import { useDispatch } from 'react-redux'

const Create = () => {

    // REDUX DISPATCH
    const dispatch = useDispatch()

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
        placeholder: 'What year was it published?'
    })

    // PUBLICATION YEAR
    const genres = useField({
        placeholder: 'Under what genres?'
    })

    // TRIGGER FORM
    const trigger = async() => {
        
        // CREATE ANECDOTE BODY
        const body = {
            title: title.value,
            author: author.value,
            published: published.value,
            genres: genres.value.split(','),
        }

        console.log(body)

        // CREATE NOTIFICATION
        dispatch({
            type: 'notifications/positive',
            message: 'Book created!'
        })
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

export default Create