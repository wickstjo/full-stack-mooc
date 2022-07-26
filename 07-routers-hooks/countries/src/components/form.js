import { useEffect, useState } from 'react'

const Form = ({ header, func, children }) => {

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
            <form onSubmit={ func }>
                <div id={ 'form' }>{ children }</div>
            </form>
        </div>
    )
}

export default Form