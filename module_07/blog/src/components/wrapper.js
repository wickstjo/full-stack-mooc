import { useEffect, useState } from 'react'

const Wrapper = ({ header, children }) => {

    // STYLE STATE
    const [style, set_style] = useState({
        opacity: 0
    })

    useEffect(() => {
        set_style({
            opacity: 0,
            transform: 'translate(0px, 15px)'
        })
        
        setTimeout(() => {
            set_style({
                opacity: 1,
                transform: 'translate(0px, 0px)'
            })
        }, 100)
    }, [])
    
    return (
        <div id={ 'wrapper' } style={ style }>
            <div id={ 'header' }>{ header }</div>
            <div id={ 'content' }>
                { children }
            </div>
        </div>
    )
}

export default Wrapper