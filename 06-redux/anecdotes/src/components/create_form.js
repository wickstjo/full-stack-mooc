import { Fragment, useReducer } from 'react'
import { useDispatch } from 'react-redux'
import input_reducer from '../reducers/input'
import axios from 'axios'

import { Button, Field } from './inputs'
import Header from './header'

const Form = () => {

    // REDUX DISPATCH
    const dispatch = useDispatch()

    // FIELD STATES
    const [input, set_input] = useReducer(input_reducer, {
        anecdote: '',
    })

    // CREATE ANECDOTE
    const create_anecdote = async (event) => {
        event.preventDefault()
        
        // IF THE INPUT IS VALID
        if (input.anecdote !== '') {

            // CREATE ANECDOTE BODY
            const anecdote = {
                text: input.anecdote,
                votes: 0,
                id: Number((Math.random() * 100000000).toFixed(0))
            }

            // CREATE THE ANECDOTE IN DB
            const response = await axios.post('http://localhost:3001/anecdotes', anecdote)
            
            // IF SOMETHING WENT WRONG, CREATE ERROR
            if (response.status !== 201) {
                return dispatch({
                    type: 'notifications/create',
                    message: `Could not create anecdote (${ response.status })`
                })
            }

            // OTHERWISE, PUSH ANECDOTE TO STATE
            dispatch({
                type: 'anecdotes/create',
                anecdote: anecdote
            })

            // CREATE NOTIFICATION
            dispatch({
                type: 'notifications/create',
                message: `Anecdote created: "${ anecdote.text }"`
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