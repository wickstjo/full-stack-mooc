import { Form, useField } from '../../inputs'
import useResource from '../../../hooks/resource'

const Create = () => {

    // FETCH SERVICE
    const service = useResource({
        url: 'http://localhost:3001/api/blogs'
    })[1]

    // TITLE FIELD
    const title = useField({
        placeholder: 'What is the title?'
    })

    // AUTHOR FIELD
    const author = useField({
        placeholder: 'Who is the author?'
    })

    // URL FIELD
    const url = useField({
        placeholder: 'What is the URL?'
    })

    // TRIGGER FORM
    const trigger = async() => {
        service.create({
            payload: {
                title: title.value,
                author: author.value,
                url: url.value,
            },
            category: 'blogs'
        })
    }

    return (
        <Form
            header={ 'create blog' }
            func={ trigger }
            fields={[ title, author, url ]}
            button={{
                label: 'create',
                required: [ title, author, url ]
            }}
        />
    )
}

export default Create