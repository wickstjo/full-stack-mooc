import './ui/styles.scss'
import { useState, useEffect } from 'react'

import Wrapper from './components/wrapper'
import Form from './components/form'
import Button from './components/button'

const App = () => {

    // ANECDOTES
    const [anecdotes] = useState([
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ])

    // CURRENTLY SELECTED ANECDOTE
    const [current, set_current] = useState(0)

    // ANECDOTE VOTES
    const [votes, set_votes] = useState(
        Array(anecdotes.length).fill(0)
    )

    // BEST ANECDOTE
    const [best, set_best] = useState({
        index: 0,
        score: 0
    })

    // UPDATE MOST POPULAR ANECDOTE
    useEffect(() => {

        // FIND BEST SCORE
        const best_score = Math.max(...votes)

        // IF ITS BETTER, UPDATE STATE
        if (best_score > best.score) {
            const target_index = votes.indexOf(best_score)
    
            set_best({
                index: target_index,
                score: best_score
            })
        }
    }, [votes, best])

    // PICK A RANDOM DIFFERENT ANECDOTE
    const select_random = () => {
        let rand = Math.floor(Math.random() * anecdotes.length);

        while (rand === current) {
            rand = Math.floor(Math.random() * anecdotes.length);
        }

        set_current(rand)
    }

    // VOTE FOR ANECDOTE
    const vote_for = () => {
        votes[current] += 1
        set_votes([...votes])
    }

    return (
        <div id={ 'main' }>
            <Wrapper header={ 'Anecdote of the Day' }>
                <div>{ anecdotes[current] }</div>
                <div>
                    <div>Number of votes:</div>
                    <div>{ votes[current] }</div>
                </div>
            </Wrapper>
            <Form header={ 'Options' }>
                <Button
                    label={ 'Vote for' }
                    func={ vote_for }
                />
                <Button
                    label={ 'Generate New' }
                    func={ select_random }
                    id={ 'yellow' }
                />
            </Form>
            <Wrapper header={ 'Most popular anecdote' }>
                <div>{ anecdotes[best.index] }</div>
                <div>
                    <div>Number of votes:</div>
                    <div>{ best.score }</div>
                </div>
            </Wrapper>
        </div>
    )
}

export default App