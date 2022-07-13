import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Form, useField } from './inputs'

const Filter = () => {

    // REDUX DISPATCH
    const dispatch = useDispatch()

    // FILTER INPUT
    const filter = useField({
        placeholder: 'Enter keyword'
    })
    
    // UPDATE FILTER IN STATE
    useEffect(() => {
        dispatch({
            type: 'filter/update',
            keyword: filter.value
        })
    }, [dispatch, filter.value])

    return (
        <Form
            header={ 'filter by keyword' }
            func={ () => {} }
            fields={[ filter ]}
            button={ false }
            reset={ false }
        />
    )
}

export default Filter