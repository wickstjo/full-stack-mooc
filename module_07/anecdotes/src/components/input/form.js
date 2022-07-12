import { useEffect, useState } from 'react'

const Form = ({ header, func, reset=undefined, children }) => {

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

    // SEPARATE INPUTS FROM BUTTON
    const inputs = [ ...children ]
    const button = inputs.pop()

    return (
        <div id={ 'wrapper' } style={ local }>
            <div id={ 'header' }>{ header }</div>
            <form onSubmit={ func }>
                <div id={ 'form' }>{ inputs }</div>
                <div id={ 'buttons' }>
                    { button }
                    { reset ? <span id={ 'reset' } onClick={ reset }>Reset</span> : null }
                </div>
            </form>
        </div>
    )
}

export default Form