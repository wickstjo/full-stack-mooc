import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Form from '../components/input/form'
import useField from '../components/input/hook'
import Button from '../components/input/button'

const Create = () => {

    // AUXILLARY HOOKS
    const dispatch = useDispatch()
    const navigator = useNavigate()

    // ANECDOTE FIELD
    const [anecdote, reset_anecdote] = useField({
        placeholder: 'What is the anecdote?'
    })

    // AUTHOR FIELD
    const [author, reset_author] = useField({
        placeholder: 'Who is the author?'
    })

    // URL FIELD
    const [url, reset_url] = useField({
        placeholder: 'Where to obtain more info?'
    })

    // TRIGGER FORM
    const trigger = (event) => {
        event.preventDefault()
        
        // CREATE ANECDOTE BODY
        const body = {
            text: anecdote.value,
            author: author.value,
            url: url.value,
            votes: 0,
            id: Number((Math.random() * 100000000).toFixed(0))
        }

        // OTHERWISE, PUSH ANECDOTE TO STATE
        dispatch({
            type: 'anecdotes/create',
            anecdote: body
        })

        // CREATE NOTIFICATION
        dispatch({
            type: 'notifications/positive',
            message: 'Anecdote created!'
        })

        // REDIRECT TO ANECDOTE PAGE
        navigator(`/anecdotes/${ body.id }`)
    }

    // RESET EVERY FIELD
    const reset = () => {
        reset_anecdote()
        reset_author()
        reset_url()
    }
    
    return (
        <Form header={ 'create new anecdote' } func={ trigger } reset={ reset }>
            <input { ...anecdote } />
            <input { ...author } />
            <input { ...url } />
            <Button
                label={ 'Create' }
                required={[
                    anecdote.value,
                    author.value,
                    url.value,
                ]}
            />
        </Form>
    )
}

export default Create