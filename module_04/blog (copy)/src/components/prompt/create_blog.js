import { useReducer } from 'react'
import { Form, Field, Button } from '../input'
import input_reducer from '../../reducers/input'

const Create = ({ state }) => {

    // INPUT STATES
    const [input, set_input] = useReducer(input_reducer, {
        title: '',
        author: '',
        url: '',
    })

    // UPDATE INPUT FIELDS
    const update_input = (event, target) => {
        set_input({
            type: 'update',
            target: target,
            payload: event.target.value
        })
    }

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
        <Form header={ 'Create blog' } func={ trigger }>
            <Field
                label={ 'What is the title?' }
                value={ input.title }
                func={
                    event => update_input(event, 'title')
                }
            />
            <Field
                label={ 'Who is the author?' }
                value={ input.author }
                func={
                    event => update_input(event, 'author')
                }
            />
            <Field
                label={ 'What is the URL?' }
                value={ input.url }
                func={
                    event => update_input(event, 'url')
                }
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