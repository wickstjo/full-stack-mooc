import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Wrapper from '../components/wrapper'
import Button from '../components/input/button'

const Anecdote = () => {

    // HOOKS
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    const params = useParams()

    // ATTEMPT TO FIND ANECDOTE
    const anecdote = anecdotes.find(item => String(item.id) === params.id)

    // VOTE FOR ANECDOTE
    const vote = () => {

        // VOTE FOR
        dispatch({
            type: 'anecdotes/vote',
            id: params.id
        })

        // CREATE NOTIFICATION
        dispatch({
            type: 'notifications/positive',
            message: 'Voted for anecdote!'
        })
    }

    switch (anecdote) {

        // NOT FOUND, RENDER ERROR
        case undefined: { return (
            <Wrapper header={ 'anecdote' }>
                <div>An anecdote with this ID does not exist.</div>
            </Wrapper>
        )}

        // RENDER NORMALLY
        default: { return (
            <Wrapper header={ 'anecdote' }>
                <div>
                    <div>Anecdote:</div>
                    <div>{ anecdote.text }</div>
                </div>
                <div>
                    <div>Author:</div>
                    <div>{ anecdote.author }</div>
                </div>
                <div>
                    <div>Info:</div>
                    <div><a href={ anecdote.url } target={ '_blank' } rel={ 'noreferrer' }>{ anecdote.url }</a></div>
                </div>
                <div>
                    <div>Votes:</div>
                    <div>{ anecdote.votes }</div>
                </div>
                <Button
                    label={ 'Vote for this' }
                    func={ vote }
                />
            </Wrapper>
        )}
    }
}

export default Anecdote