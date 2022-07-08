import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Header from './header'

const Filter = () => {

    // REDUX DISPATCH
    const input = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const set_input = (event) => {
        dispatch({
            type: 'filter/update',
            keyword: event.target.value
        })
    }

    return (
        <Fragment>
            <Header text={ 'Filter Anecdotes' } />
            <input
                value={ input.value }
                placeholder={ 'Enter keyword' }
                onChange={ set_input }
                type={ 'text' }
            />
        </Fragment>
    )
}

export default Filter