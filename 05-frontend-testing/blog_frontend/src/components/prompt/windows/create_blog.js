import Form from '../../input/form'
import useField from '../../../hooks/field'
import useResource from '../../../hooks/resource'

const CreateBlog = () => {

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
        await actions.create({
            title: title.value,
            author: title.author,
            url: title.url,
        })
    }

    return (
        <Form
            header={ 'create blog' }
            func={ trigger }
            fields={[ title, author, url ]}
            required={[ title, author, url ]}
            button={ 'create blog' }
        />
    )
}

export default CreateBlog