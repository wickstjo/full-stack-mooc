import { useDispatch, useSelector } from 'react-redux'
import { Form, useField } from './inputs'

const Filter = () => {

    // AUXILLARY
    const { filter } = useSelector(state => state)
    const dispatch = useDispatch()

    // FILTER INPUT
    const filter_field = useField({
        placeholder: 'Filter by genre',
        default_value: filter
    })
    
    // TRIGGER FORM
    const trigger = () => {
        dispatch({
            type: 'filter/update',
            keyword: filter_field.value
        })
    }

    return (
        <Form
            header={ 'filter by keyword' }
            func={ trigger }
            fields={[ filter_field ]}
            button={{
                label: 'filter'
            }}
            reset={ false }
        />
    )
}

export default Filter