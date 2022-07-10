import { useReducer } from 'react'
import { useSelector } from 'react-redux'

import Form from '../../input/form'
import Field from '../../input/field'
import Button from '../../input/button'
import reducer from '../../input/reducer'

const Update = () => {

    // REDUX HOOKS
    const prompt = useSelector(state => state.prompts)

    // INPUT STATES -- CLONE FROM PROVIDED STATE
    const [input, set_input] = useReducer(reducer, {
        title: prompt.blog.title,
        author: prompt.blog.author,
        url: prompt.blog.url
    })

    // TRIGGER FORM
    const trigger = async(event) => {
        event.preventDefault()
        prompt.callback(input)
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