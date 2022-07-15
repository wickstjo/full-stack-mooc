import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'

import { update_author, one_author, all_authors } from '../../../models'
import { Form, useField } from '../../inputs'

const Update = () => {

    // AUXILLARY
    const prompt = useSelector(state => state.prompts)
    const dispatch = useDispatch()

    // CREATE BOOK
    const [editAuthor] = useMutation(update_author, {
        refetchQueries: [{
            query: one_author(prompt.id)
        }, {
            query: all_authors
        }]
    })

    // TITLE FIELD
    const name = useField({
        placeholder: 'What is their name?',
        default_value: prompt.author.name,
    })

    // AUTHOR FIELD
    const born = useField({
        placeholder: 'When were they born?',
        default_value: prompt.author.born ? prompt.author.born : 0,
        type: 'number'
    })

    // TRIGGER FORM
    const trigger = async () => {

        // ATTEMPT TO UPDATE THE AUTHOR
        try {
            await editAuthor({
                variables: {
                    id: prompt.id,
                    name: name.value,
                    born: Number(born.value)
                }
            })
            
            // NOTIFY SUCCESS
            dispatch({
                type: 'notifications/positive',
                message: 'Author updated!'
            })

            // HIDE PROMPT
            dispatch({  type: 'prompts/hide' })
        
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

export default Update