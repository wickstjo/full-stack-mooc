import { useEffect, useState } from 'react'

const Entry = ({ data }) => {

    // STYLE STATE
    const [style, set_style] = useState({})

    // AFTER 2 SECONDS, HIDE NOTIFICATION WITH CSS
    useEffect(() => {
        setTimeout(() => {
            set_style({
                display: 'none'
            })
        }, 2000)
    }, [])

    return (
        <div className={ 'wrapper' } style={ style }>
            <div id={ data.type }>
                { data.message }
            </div>
        </div>
    )
}

export default Entry