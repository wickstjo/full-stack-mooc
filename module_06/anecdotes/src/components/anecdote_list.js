import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from './header'
import { Button } from './inputs'


const Anecdotes = () => {

    // REDUX STATE
    const filter = useSelector(state => state.filter)
    const state = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    // FILTER & SORT
    const filtered = [...state].filter(item => item.text.toLowerCase().includes(filter.value.toLowerCase()))
    const sorted = filtered.sort((a, b) => b.votes - a.votes)

    // VOTE FOR ANECDOTE
    const vote_for = (item) => {

        // REGISTER VOTE
        dispatch({
            type: 'anecdotes/vote',
            id: item.id
        })

        // CREATE NOTIFICATION
        dispatch({
            type: 'notifications/create',
            message: `Voted for: "${ item.text }"`
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

export default Anecdotes