import { Fragment, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import axios from 'axios'

import Header from './header'
import { Button } from './inputs'

const Anecdotes = ({ anecdotes, filter }) => {

    // REDUX DISPATCH
    const dispatch = useDispatch()

    // FILTER & SORT ANECDOTES
    const filtered = [...anecdotes].filter(item => item.text.toLowerCase().includes(filter.value.toLowerCase()))
    const sorted = filtered.sort((a, b) => b.votes - a.votes)
    
    // ON LOAD, FETCH ANECDOTES FROM DB
    useEffect(() => {
        axios.get('http://localhost:3001/anecdotes').then(response => {

            // CATCH ERRORS
            if (response.status !== 200) {
                return dispatch({
                    type: 'notifications/create',
                    message: `Could not load anecdotes from DB (${ response.status })`
                })
            }

            // OTHERWISE, LOAD IN DATASET
            dispatch({
                type: 'anecdotes/load',
                dataset: response.data
            })

            // CREATE NOTIFICATION
            dispatch({
                type: 'notifications/create',
                message: 'Anecdotes loaded from DB',
                duration: 1000
            })
        })
    }, [dispatch])

    // VOTE FOR ANECDOTE
    const vote_for = (item) => {

        // CLONE AND MODIFY THE ITEM
        const temp = {...item}
        temp.votes += 1

        axios.put(`http://localhost:3001/anecdotes/${ item.id }`, temp).then(response => {
            
            // CATCH ERRORS
            if (response.status !== 200) {
                return dispatch({
                    type: 'notifications/create',
                    message: `Could not register your vote "${ response.status }"`
                })
            }

            // OTHERWISE, UPDATE STATE
            dispatch({
                type: 'anecdotes/vote',
                id: item.id
            })
    
            // CREATE NOTIFICATION
            dispatch({
                type: 'notifications/create',
                message: `Voted for: "${ item.text }"`
            })
        })
    }

    return (
        <Fragment>
            <Header text={ 'Anecdotes' } />
            { sorted.map(item =>
                <Fragment key={ item.id }>
                    <div>{ item.text }</div>
                    <div>Has { item.votes } votes!</div>
                    <Button
                        label={ 'Vote' }
                        func={() => {
                            vote_for(item)
                        }}
                    />
                    <br />
                </Fragment>
            )}
        </Fragment>
    )
}

// REQUIRED PROPS
const component_props = (state) => { return {
    filter: state.filter,
    anecdotes: state.anecdotes,
}}

// TRANSFORM & EXPORT
export default connect(component_props)(Anecdotes)