import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'

import { update_user, one_user } from '../../../models'
import { Form, useField } from '../../inputs'

const Update = () => {

    // AUXILLARY
    const { prompts, auth } = useSelector(state => state)
    const dispatch = useDispatch()

    // CREATE BOOK
    const [editUser] = useMutation(update_user, {
        refetchQueries: [{
            query: one_user(prompts.id)
        }],
        context: {
            headers: {
                authorization: `bearer ${ auth.token }`
            }
        }
    })

    // TITLE FIELD
    const genre = useField({
        placeholder: 'What is your favorite genre?',
        default_value: prompts.genre,
    })

    // TRIGGER FORM
    const trigger = async () => {

        // ATTEMPT TO UPDATE THE AUTHOR
        try {
            await editUser({
                variables: {
                    id: prompts.id,
                    genre: genre.value,
                }
            })
            
            // NOTIFY SUCCESS
            dispatch({
                type: 'notifications/positive',
                message: 'User updated!'
            })

            // HIDE PROMPTs
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
            header={ 'update favorite genre' }
            func={ trigger }
            fields={[ genre ]}
            button={{
                label: 'update',
                required: [ genre ]
            }}
        />
    )
}

export default Update