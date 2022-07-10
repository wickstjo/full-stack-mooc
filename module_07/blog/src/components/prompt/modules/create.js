import { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Form from '../../input/form'
import Field from '../../input/field'
import Button from '../../input/button'
import reducer from '../../input/reducer'

import * as blog_funcs from '../../../funcs/blog'

const Create = () => {

    // HOOKS
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigator = useNavigate()

    // INPUT STATES
    const [input, set_input] = useReducer(reducer, {
        title: '',
        author: '',
        url: '',
    })

    // TRIGGER FORM
    const trigger = async(event) => {
        event.preventDefault()

        // ATTEMPT TO CREATE THE BLOG
        const response = await blog_funcs.create(input, auth.token)

        // CATCH ERRORS
        if (response.status !== 201) {
            return dispatch({
                type: 'notifications/negative',
                message: response.data.errors
            })
        }

        // REDIRECT TO USER PAGE
        navigator(`/blogs/${ response.data.id }`)

        // CREATE NOTIFICATION
        dispatch({
            type: 'notifications/positive',
            message: 'Blog successfully created',
        })

        // HIDE PROMPT
        set_input({ type: 'reset' })
        dispatch({ type: 'prompts/hide' })
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