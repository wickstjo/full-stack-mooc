import { useState } from 'react'

const useField = (type='text') => {

    // INPUT STATE
    const [value, setValue] = useState('')

    // UPDATE
    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export default useField