import { useSelector } from 'react-redux'
import { Form, useField } from '../../inputs'

const Update = () => {

    // REDUX HOOKS
    const prompt = useSelector(state => state.prompts)

    // TITLE FIELD
    const title = useField({
        placeholder: 'What is the title?',
        default_value: prompt.resource.title,
    })

    // AUTHOR FIELD
    const author = useField({
        placeholder: 'Who is the author?',
        default_value: prompt.resource.author,
    })

    // URL FIELD
    const url = useField({
        placeholder: 'What is the URL?',
        default_value: prompt.resource.url,
    })

    // TRIGGER FORM
    const trigger = () => {
        prompt.service({
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
                label: 'update',
                required: [ title, author, url]
            }}
        />
    )
}

export default Update