import { useEffect, useState } from 'react'

const Form = ({ header, func, children }) => {

    const [local, set_local] = useState({
        opacity: 0
    })

    useEffect(() => {
        set_local({
            opacity: 0,
            transform: 'translate(0px, -15px)'
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
                <div id={ 'content' }>{ inputs }</div>
                { button }
            </form>
        </div>
    )
}

export default Form