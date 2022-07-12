import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, useField } from '../../inputs'

import * as blog_funcs from '../../../funcs/blog'

const Create = () => {

    // HOOKS
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigator = useNavigate()

    // TITLE FIELD
    const title = useField({
        placeholder: 'What is the title?'
    })

    // AUTHOR FIELD
    const author = useField({
        placeholder: 'Who is the author?'
    })

    // URL FIELD
    const url = useField({
        placeholder: 'What is the URL?'
    })

    // TRIGGER FORM
    const trigger = async() => {

        // ATTEMPT TO CREATE THE BLOG
        const response = await blog_funcs.create({
            title: title.value,
            author: author.value,
            url: url.value,
        }, auth.token)

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
        dispatch({ type: 'prompts/hide' })
    }

    return (
        <Form
            header={ 'create blog' }
            func={ trigger }
            fields={[ title, author, url ]}
            button={{
                label: 'create',
                required: [ title, author, url ]
            }}
        />
    )
}

export default Create