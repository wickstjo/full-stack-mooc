import { useSelector } from 'react-redux'
import Anecdote from './anecdote'

const Anecdotes = () => {

    // FETCH REDUX STATES
    const { anecdotes, filter } = useSelector(state => state)

    // FILTER & SORT ANECDOTES
    const filtered = [...anecdotes].filter(item => item.text.toLowerCase().includes(filter.toLowerCase()))
    const sorted = filtered.sort((a, b) => b.votes - a.votes)
    
    return sorted.map(item =>
        <Anecdote
            item={ item }
            key={ item.id }
        />
    )
}

export default Anecdotes