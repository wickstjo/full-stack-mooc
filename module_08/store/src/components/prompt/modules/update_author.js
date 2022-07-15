import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'

import { update_author, AUTHOR, AUTHORS } from '../../../models'
import { Form, useField } from '../../inputs'

const UpdateAuthor = () => {

    // AUXILLARY
    const { auth, prompts } = useSelector(state => state)
    const dispatch = useDispatch()

    // CREATE BOOK
    const [editAuthor] = useMutation(update_author, {
        refetchQueries: [
            { query: AUTHORS.query },
            {
                query: AUTHOR.query,
                variables: {
                    id: prompts.id
                }
            },
        ],
        context: auth.header
    })

    // TITLE FIELD
    const name = useField({
        placeholder: 'What is their name?',
        default_value: prompts.author.name,
    })

    // AUTHOR FIELD
    const born = useField({
        placeholder: 'When were they born?',
        default_value: prompts.author.born ? prompts.author.born : 0,
        type: 'number'
    })

    // TRIGGER FORM
    const trigger = async () => {

        // ATTEMPT TO UPDATE THE AUTHOR
        try {
            await editAuthor({
                variables: {
                    id: prompts.id,
                    name: name.value,
                    born: Number(born.value)
                }
            })
            
            // NOTIFY SUCCESS
            dispatch({
                type: 'notifications/positive',
                message: 'Author updated!'
            })

            // HIDE PROMPTs
            dispatch({ type: 'prompts/hide' })
        
        // CATCH & RENDER VALIDATION ERRORS
        } catch (error) {
            dispatch({
                type: 'notifications/negative',
                message: error.graphQLErrors.map(item => item.message)
            })
        }
    }

    return (
        <Form
            header={ 'update author' }
            func={ trigger }
            fields={[ name, born ]}
            button={{
                label: 'update',
                required: [ name, born ]
            }}
        />
    )
}

export default UpdateAuthor