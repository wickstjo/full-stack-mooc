import Form from '../../inputs/form'
import useField from '../../../hooks/field'
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

    // URL FIELD
    const likes = useField({
        placeholder: 'How many likes should it have?',
        type: 'number'
    })

    // TRIGGER FORM
    const trigger = async() => {

        // DEFAULT BLOG SUITE
        const blog = {
            title: title.value,
            author: author.value,
            url: url.value,
        }

        // IF LIKES WERE ASSIGNED, PUSH TO BLOG
        if (likes.value !== '') {
            blog.likes = likes.value
        }

        service.create({
            payload: blog,
            category: 'blogs'
        })
    }

    return (
        <Form
            header={ 'create blog' }
            func={ trigger }
            fields={[ title, author, url, likes ]}
            required={[ title, author, url ]}
            button={ 'create' }
        />
    )
}

export default Create