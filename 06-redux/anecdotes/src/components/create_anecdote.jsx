import Form from './input/form'
import useField from './input/field'
import { useDispatch } from 'react-redux'
import { create_one } from '../redux/anecdotes'

const CreateAnecdote = () => {

    // AUXILLARY
    const dispatch = useDispatch()

    const message = useField({
        placeholder: 'What is the anecdote?'
    })

    const create = async () => {

        dispatch(create_one({
            text: message.value,
            votes: 0
        }))

        dispatch({
            type: 'notifications/positive',
            message: 'Anecdote created' 
        })

        message.reset()
    }

    return (
        <Form
            header={ 'Create new anecdote' }
            fields={[ message ]}
            required={[ message ]}
            button={ 'create anecdote' }
            func={ create }
        />
    )
}

export default CreateAnecdote