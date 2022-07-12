import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Wrapper from '../components/wrapper'
import Filter from '../components/filter'

const Anecdotes = () => {

    // REDUX STATES
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    
    // FILTER ANECDOTES
    const filtered = anecdotes.filter(item => item.text.includes(filter.value))
    const sorted = filtered.sort((a, b) => b.votes - a.votes)

    return (
        <Fragment>
            <Filter />
            <Wrapper header={ 'anecdotes' }>
                <Swapper data={ sorted } />
            </Wrapper>
        </Fragment>
    )
}

const Swapper = ({ data }) => {
    switch(data.length) {
        
        // EMTPY ARRAY, RENDER ERROR
        case 0: { return (
            <div>No anecdotes found.</div>
        )}

        // RENDER LIST
        default: { return (
            data.map(item =>
                <div key={ item.id }>
                    <div><Link to={ `/anecdotes/${ item.id }` }>{ item.text }</Link></div>
                    <div>{ item.votes } Votes</div>
                </div>
            )
        )}
    }
}

export default Anecdotes