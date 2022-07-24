import { useState } from 'react'

const useField = ({ type='text', default_value='', id='fallback', placeholder }) => {

    // LOCAL STATE
    const [value, set_value] = useState(default_value)

    // UPDATE SELECTOR VALUE
    const onChange = (event) => {
        set_value(event.target.value)
    }

    // RESET SELECTOR VALUE
    const reset = () => {
        set_value(default_value)
    }

    return {
        type,
        placeholder,
        value,
        id,
        onChange,
        reset
    }
}

export default useField