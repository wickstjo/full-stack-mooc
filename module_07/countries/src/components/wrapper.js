import { useEffect, useState } from 'react'

const Wrapper = ({ header, children }) => {

    const [local, set_local] = useState({
        opacity: 0
    })

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
            <div id={ 'content' }>
                { children }
            </div>
        </div>
    )
}

export default Wrapper