import { useReducer } from 'react'
import Form from '../input/form'
import Field from '../input/field'
import Button from '../input/button'
import input_reducer from '../../reducers/input'

const Update = ({ state }) => {

    // INPUT STATES -- CLONE FROM PROVIDED STATE
    const [input, set_input] = useReducer(input_reducer, {
        title: state.blog.title,
        author: state.blog.author,
        url: state.blog.url
    })

    // TRIGGER FORM
    const trigger = async (event) => {
        event.preventDefault()
        const success = await state.func(input, state.blog.id)

        if (success) {
            set_input({
                type: 'reset'
            })
        }
    }

    return (
        <Form header={ 'update blog' } func={ trigger }>
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
                label={ 'Update' }
                required={[
                    input.title,
                    input.author,
                    input.url
                ]}
            />
        </Form>
    )
}

export default Update