import Wrapper from './wrapper'
import Button from './input/button'
import { useDispatch } from 'react-redux'
import { vote_for } from '../redux/anecdotes'

const Anecdote = ({ item }) => {

    // AUXILALRY
    const dispatch = useDispatch()

    const vote = () => {
        dispatch(vote_for({
            ...item,
            votes: item.votes + 1
        }))
    }
    return (
        <Wrapper header={ `anecdote ${ item.id }` }>
            <div>{ item.text }</div>
            <div>
                <div>Number of votes:</div>
                <div>{ item.votes }</div>
            </div>
            <div id={ 'foo' }>
                <Button
                    label={ 'Vote for' }
                    func={ vote }
                />
            </div>
        </Wrapper>
    )
}

export default Anecdote