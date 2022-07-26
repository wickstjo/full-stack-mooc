import { useState } from 'react'

export default ({ password=false, default_value='', placeholder }) => {

    // LOCAL STATE
    const [value, set_value] = useState(default_value)

    // UPDATE SELECTOR VALUE
    const onChangeText = (text) => {
        set_value(text)
    }

    const secureTextEntry = password

    return {
        placeholder,
        value,
        secureTextEntry,
        onChangeText,
    }
}