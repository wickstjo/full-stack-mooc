import { Fragment, useReducer } from 'react';
import { store } from '../reducers/anecdote_reducer'
import input_reducer from '../reducers/input'

import { Button, Field } from './inputs'
import Header from './header'

const Form = () => {

    // FIELD STATES
    const [input, set_input] = useReducer(input_reducer, {
        anecdote: '',
    })

    // CREATE ANECDOTE
    const create_anecdote = (event) => {
        event.preventDefault()
        
        // IF THE INPUT IS VALID
        if (input.anecdote !== '') {

            // CREATE ANECDOTE
            store.dispatch({
                type: 'create',
                anecdote: input.anecdote
            })

            // RESET INPUT STATES
            set_input({
                type: 'reset'
            })
        }
    }

    return (
        <Fragment>
            <Header text={ 'Create Anecdote' } />
            <form onSubmit={ create_anecdote }>
                <Field
                    label={ 'What is the anecdote?' }
                    value={ input.anecdote }
                    target={ 'anecdote' }
                    func={ set_input }
                />
                <Button
                    label={ 'Create' }
                    func={ create_anecdote }
                />
            </form>
        </Fragment>
    )
}

export default Form