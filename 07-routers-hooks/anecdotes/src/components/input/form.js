import { useEffect, useState } from 'react'
import Button from './button'

const Form = ({ header, func, fields, required, button=false }) => {

    // FORM TRIGGER
    const trigger = async(event) => {
        event.preventDefault()
        func()
    }

    // RESET ALL FIELDS
    const reset_all = () => {
        fields.forEach(field => {
            field.reset()
        })
    }

    // STYLE STATE
    const [local, set_local] = useState({
        opacity: 0
    })

    // TRANSITION SMOOTHLY
    useEffect(() => {
        set_local({
            opacity: 0,
            transform: 'translate(0px, 15px)'
        })
        
        setTimeout(() => {
            set_local({
                opacity: 1,
                transform: 'translate(0px, 0px)'
            })
        }, 100)
    }, [])

    return (
        <div id={ 'wrapper' } style={ local }>
            <div id={ 'header' }>{ header }</div>
            <form onSubmit={ trigger }>
                <div id={ 'form' }>
                    { fields.map((field, index) =>
                        <input
                            { ...field }
                            key={ index }
                            reset={ '' }
                        />
                    )}
                </div>
                { button ?
                    <div id={ 'buttons' }>
                        <Button
                            label={ button }
                            required={ required }
                        />
                        <span id={ 'reset' } onClick={ reset_all }>Reset</span>
                    </div>
                : null }
            </form>
        </div>
    )
}

export default Form