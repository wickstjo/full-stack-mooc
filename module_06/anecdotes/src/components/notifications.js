import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

    // REDUX STATE
    const state = useSelector(state => state.notifications)

    return state.map(item =>
        <Entry
            key={ item.id }
            message={ item.message }
        />
    )
}

const Entry = ({ message }) => {

    // STYLE STATE
    const [style, set_style] = useState({
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5
    })
    
    // AFTER 2 SECONDS, HIDE NOTIFICATION WITH CSS
    useEffect(() => {
        setTimeout(() => {
            set_style({
                display: 'none'
            })
        }, 5000)
    }, [])

    return (
        <div style={ style }>
            { message }
        </div>
    )
}

export default Notification