import { Fragment } from 'react';
import { connect, useDispatch } from 'react-redux'
import Header from './header'

const Filter = ({ input }) => {

    // REDUX DISPATCH
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

// REQUIRED PROPS
const component_props = (state) => { return {
    input: state.filter,
}}

// TRANSFORM & EXPORT
export default connect(component_props)(Filter)