import { useState, Fragment, useEffect } from 'react'

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
    
    // PICK A RANDOM DIFFERENT ANECDOTE
    const select_random = () => {
        let rand = Math.floor(Math.random() * anecdotes.length);

        while (rand === current) {
            rand = Math.floor(Math.random() * anecdotes.length);
        }

        set_current(rand)
    }

    // ANECDOTE VOTES
    const [votes, set_votes] = useState(
        Array(anecdotes.length).fill(0)
    )

    // VOTE FOR ANECDOTE
    const vote_for = () => {
        votes[current] += 1
        set_votes([...votes])
    }

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

    return (
        <Fragment>
            <Header text={ 'Anecdote of the Day' } />
            <Row text={ anecdotes[current] } />
            <Row text={ 'Has ' + votes[current] + ' votes!' } />
            <Button
                label={ 'Vote for' }
                func={ vote_for }
            />
            <Button
                label={ 'Generate New' }
                func={ select_random }
            />
            <Header text={ 'Most popular Anecdote' } />
            <Row text={ anecdotes[best.index] } />
            <Row text={ 'Has ' + best.score + ' votes!' } />
        </Fragment>
    )
}

const Header = ({ text }) => { return (
    <h1>{ text }</h1>
)}

const Button = ({ label, func }) => { return (
    <button onClick={ func }>{ label }</button>
)}

const Row = ({ text }) => { return (
    <div>{ text }</div>
)}

export default App