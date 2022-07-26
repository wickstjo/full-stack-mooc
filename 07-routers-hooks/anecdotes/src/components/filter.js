import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Form from './input/form'
import useField from './input/hook'

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
            fields={[ filter ]}
        />
    )
}

export default Filter