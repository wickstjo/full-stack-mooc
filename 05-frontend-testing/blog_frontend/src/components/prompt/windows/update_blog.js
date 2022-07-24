import Form from '../../input/form'
import useField from '../../../hooks/field'
import useResource from '../../../hooks/resource'
import { useSelector } from 'react-redux'

const UpdateBlog = () => {

    // REDUX STATE -- FOR READING PASSED DATA
    const prompts = useSelector(state => state.prompts)

    // RESOURCE STATE
    const [, actions] = useResource({
        url: 'http://localhost:3001/api/blogs',
        fetch_data: false
    })

    const title = useField({
        placeholder: 'What is the title?'
    })

    const author = useField({
        placeholder: 'Who is the author?'
    })

    const url = useField({
        placeholder: 'What is the URL?'
    })

    // TRIGGER FORM
    const trigger = async () => {
        await actions.update({
            title: title.value,
            author: title.author,
            url: title.url,
            id: prompts.blog.id
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