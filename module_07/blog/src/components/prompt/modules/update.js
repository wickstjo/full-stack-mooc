import { useSelector } from 'react-redux'
import { Form, useField } from '../../inputs'

const Update = () => {

    // REDUX HOOKS
    const prompt = useSelector(state => state.prompts)

    // TITLE FIELD
    const title = useField({
        placeholder: 'What is the title?',
        default_value: prompt.blog.title,
    })

    // AUTHOR FIELD
    const author = useField({
        placeholder: 'Who is the author?',
        default_value: prompt.blog.author,
    })

    // URL FIELD
    const url = useField({
        placeholder: 'What is the URL?',
        default_value: prompt.blog.url,
    })

    // TRIGGER FORM
    const trigger = async() => {
        prompt.callback({
            title: title.value,
            author: author.value,
            url: url.value,
        })
    }

    return (
        <Form
            header={ 'update blog' }
            func={ trigger }
            fields={[ title, author, url ]}
            button={{
                label: 'register',
                required: [ title, author, url]
            }}
        />
    )
}

export default Update