import Form from '../../input/form'
import useField from '../../../hooks/field'
import useResource from '../../../hooks/resource'

const CreateBlog = ({ mock_trigger=false }) => {

    // RESOURCE ACTIONS
    const service = useResource({
        url: 'http://localhost:3001/api/blogs',
        resource_name: 'blogs',
    })

    const title = useField({
        placeholder: 'What is the title?',
        id: 'create_title',
    })

    const author = useField({
        placeholder: 'Who is the author?',
        id: 'create_author',
    })

    const url = useField({
        placeholder: 'What is the URL?',
        id: 'create_url',
    })

    const likes = useField({
        placeholder: 'How many likes should it have?',
        type: 'number',
        id: 'create_likes',
    })

    // TRIGGER FORM
    const trigger = async () => {

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

        // ONLY FOR UNIT TESTING
        if (mock_trigger) {
            return mock_trigger(blog)
        }

        await service.create(blog)
    }

    return (
        <Form
            header={ 'create blog' }
            func={ trigger }
            fields={[ title, author, url, likes ]}
            required={[ title, author, url ]}
            button={ 'create blog' }
        />
    )
}

export default CreateBlog