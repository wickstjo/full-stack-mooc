import Form from '../../input/form'
import useField from '../../../hooks/field'
import useResource from '../../../hooks/resource'
import { useSelector } from 'react-redux'

const UpdateBlog = () => {

    // REDUX STATE -- FOR READING PASSED DATA
    const prompts = useSelector(state => state.prompts)

    // RESOURCE STATE
    const service = useResource({
        url: 'http://localhost:3001/api/blogs',
        resource_name: 'blogs'
    })

    const title = useField({
        placeholder: 'What is the title?',
        default_value: prompts.blog.title,
        id: 'update_title'
    })

    const author = useField({
        placeholder: 'Who is the author?',
        default_value: prompts.blog.author,
        id: 'update_author'
    })

    const url = useField({
        placeholder: 'What is the URL?',
        default_value: prompts.blog.url,
        id: 'update_url'
    })

    // TRIGGER FORM
    const trigger = async () => {
        await service.update({
            title: title.value,
            author: author.value,
            url: url.value,
            id: prompts.blog.id,
        })
    }

    return (
        <Form
            header={ 'update blog' }
            func={ trigger }
            fields={[ title, author, url ]}
            required={[ title, author, url ]}
            button={ 'update blog' }
        />
    )
}

export default UpdateBlog