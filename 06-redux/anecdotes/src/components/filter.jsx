import { useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import Form from './input/form'
import useField from './input/field'

const Filter = ({ filter }) => {

    const dispatch = useDispatch()

    const filter_field = useField({
        placeholder: 'Filter anecdotes',
        default_value: filter
    })

    useEffect(() => {
        dispatch({
            type: 'filter/update',
            keyword: filter_field.value
        })
    }, [filter_field.value, dispatch])

    return (
        <Form
            header={ 'Filter anecdotes' }
            fields={[ filter_field ]}
        />
    )
}

// REQUIRED PROPS
const component_props = (state) => { return {
    filter: state.filter,
}}

// TRANSFORM & EXPORT
export default connect(component_props)(Filter)