import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { v1 as uuid } from 'uuid'

import Form from '../components/input/form'
import useField from '../components/input/hook'

const Create = () => {

    // AUXILLARY HOOKS
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const anecdote = useField({
        placeholder: 'What is the anecdote?'
    })

    const author = useField({
        placeholder: 'Who is the author?'
    })

    const url = useField({
        placeholder: 'Where to obtain more info?'
    })

    // TRIGGER FORM
    const trigger = () => {
        
        // CREATE ANECDOTE BODY
        const body = {
            text: anecdote.value,
            author: author.value,
            url: url.value,
            votes: 0,
            id: uuid()
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
    
    return (
        <Form
            header={ 'create new anecdote' }
            fields={[ anecdote, author, url ]}
            required={[ anecdote, author, url ]}
            func={ trigger }
            button={ 'create' }
        />
    )
}

export default Create