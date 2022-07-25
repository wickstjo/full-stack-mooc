import { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'

const Notifications = ({ notifications }) => {

    // LOOP OUT EACH NOTIFICATION
    return notifications.map(item =>
        <Entry
            key={ item.id }
            item={ item }
        />
    )
}

const Entry = ({ item }) => {

    // ASSESS DURATION -- DEFAULT TO 5000 MS
    const duration = item.duration ? item.duration : 5000

    // REDUX DISPATCH
    const dispatch = useDispatch()

    // STYLE STATE
    const [style] = useState({
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5
    })
    
    // AUTO-REMOVE NOTIFICATION AFTER X MS
    useEffect(() => {
        setTimeout(() => {
            dispatch({
                type: 'notifications/remove',
                id: item.id
            })
        }, duration)
    }, [dispatch, item.id, duration])

    return (
        <div style={ style }>
            { item.message }
        </div>
    )
}

// REQUIRED PROPS
const component_props = (state) => { return {
    notifications: state.notifications,
}}

// TRANSFORM & EXPORT
export default connect(component_props)(Notifications)