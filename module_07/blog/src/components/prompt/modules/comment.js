import { useSelector } from 'react-redux'
import { Form, useField } from '../../inputs'

const Comment = () => {

    // REDUX HOOKS
    const prompt = useSelector(state => state.prompts)

    // COMMENT FIELD
    const comment = useField({
        placeholder: 'What is your comment?',
    })

    // TRIGGER FORM
    const trigger = () => {
        prompt.service(comment.value)
    }

    return (
        <Form
            header={ 'leave comment' }
            func={ trigger }
            fields={[ comment ]}
            button={{
                label: 'submit',
                required: [ comment ]
            }}
        />
    )
}

export default Comment