import { useState } from 'react'

export default ({ type='text', default_value='', placeholder }) => {

    // LOCAL STATE
    const [value, set_value] = useState(default_value)

    // UPDATE SELECTOR VALUE
    const onChangeText = (text) => {
        set_value(text)
    }

    return {
        type,
        placeholder,
        value,
        onChangeText,
    }
}