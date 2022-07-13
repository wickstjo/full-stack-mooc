import { useEffect, useState } from 'react'
import useTransition from '../hooks/transition'

// INPUT FIELD HOOK
const useField = ({ type='text', default_value='', placeholder }) => {

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
        onChange,
        reset
    }
}

// INPUT FIELD FORM
const Form = ({ header, func, fields, button=true, reset=true }) => {

    // CONTAINERS
    const funcs = []
    const inputs = []

    // SEPARATE RESET FUNC FROM FIELD HOOKS
    fields.forEach(item => {
        funcs.push(item.reset)
        delete item.reset

        inputs.push(item)
    })

    // CSS TRANSITION
    const style = useTransition()

    // FORM TRIGGER
    const trigger = async(event) => {
        event.preventDefault()
        func()
    }

    // RESET ALL FIELDS
    const reset_all = () => {
        funcs.forEach(reset => {
            reset()
        })
    }

    return (
        <div id={ 'wrapper' } style={ style }>
            <div id={ 'header' }>{ header }</div>
            <form onSubmit={ trigger }>
                <div id={ 'content' }>
                    { inputs.map((item, index) =>
                        <input
                            key={ index }
                            { ...item }
                        />
                    )}
                </div>
                <div id={ 'buttons' }>
                    { button ? <Button label={ button.label } required={ button.required } /> : null }
                    { reset ? <span id={ 'reset' } onClick={ reset_all }>Reset</span> : null }
                </div>
            </form>
        </div>
    )
}

// FORM BUTTON
const Button = ({ label, required }) => {

    // ACTIVE STATUS
    const [status, set_status] = useState(true)

    // VALIDATE WHETHER REQUIRED FIELDS ARE FILLED
    useEffect(() => {

        // DEFAULT TO FALSE
        let result = false

        // TOGGLE RESULT IF AN EMPTY STRING IS FOUND
        for (let item of required) {
            if (item.value === '') {
                result = true
                break
            }
        }

        // SET STATUS
        set_status(result)
    }, [required])

    return (
        <input
            value={ label }
            type={ 'submit' }
            id={ 'submit' }
            disabled={ status }
        />
    )
}

export {
    Form,
    useField
}