import { useReducer } from 'react';
import { Form, Field, Button } from '../input'
import input_reducer from '../../reducers/input';

const Update = ({ state }) => {

    // INPUT STATES -- CLONE FROM PROVIDED STATE
    const [input, set_input] = useReducer(input_reducer, {
        title: state.blog.title,
        author: state.blog.author,
        url: state.blog.url
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
        const success = await state.func(input, state.blog.id)

        if (success) {
            set_input({
                type: 'reset'
            })
        }
    }

    return (
        <Form header={ 'Register User' } func={ trigger }>
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