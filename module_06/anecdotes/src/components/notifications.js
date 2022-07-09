import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

    // REDUX STATE
    const state = useSelector(state => state.notifications)

    // LOOP OUT EACH NOTIFICATION
    return state.map(item =>
        <Entry
            key={ item.id }
            message={ item.message }
            duration={ item.duration }
        />
    )
}

const Entry = ({ message, duration }) => {

    // IF NO DURATION WAS PASSED, DEFAULT TO 5 SECONDS
    if (!duration) { duration = 5000 }

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
        }, duration)
    }, [duration])

    return (
        <div style={ style }>
            { message }
        </div>
    )
}

export default Notification