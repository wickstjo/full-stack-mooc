import { useState, useEffect } from 'react'

const useTransition = () => {

    // STYLE STATE
    const [style, set_style] = useState({
        opacity: 0,
        transform: 'translate(0px, 15px)'
    })

    useEffect(() => {
        setTimeout(() => {
            set_style({
                opacity: 1,
                transform: 'translate(0px, 0px)'
            })
        }, 100)
    }, [])

    return style
}

export default useTransition