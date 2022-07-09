import { useReducer } from 'react'
import Form from '../input/form'
import Field from '../input/field'
import Button from '../input/button'
import input_reducer from '../../reducers/input'

const Create = ({ state }) => {

    // INPUT STATES
    const [input, set_input] = useReducer(input_reducer, {
        title: '',
        author: '',
        url: '',
    })

    // TRIGGER FORM
    const trigger = async (event) => {
        event.preventDefault()
        const success = await state.func(input)

        // RESET FIELDS IF CHECKS PASS
        if (success) {
            set_input({
                type: 'reset'
            })
        }
    }

    return (
        <Form header={ 'create blog' } func={ trigger }>
            <Field
                label={ 'What is the title?' }
                value={ input.title }
                target={ 'title' }
                func={ set_input }
            />
            <Field
                label={ 'Who is the author?' }
                value={ input.author }
                target={ 'author' }
                func={ set_input }
            />
            <Field
                label={ 'What is the URL?' }
                value={ input.url }
                target={ 'url' }
                func={ set_input }
            />
            <Button
                label={ 'Create' }
                required={[
                    input.title,
                    input.author,
                    input.url
                ]}
            />
        </Form>
    )
}

export default Create