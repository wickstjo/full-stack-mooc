import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Text } from 'react-native'
import styles from '../../styles/notifications'

const Entry = ({ item }) => {

    // REDUX DISPATCH
    const dispatch = useDispatch()

    // AFTER DURATION, REMOVE NOTIFICATION
    useEffect(() => {
        setTimeout(() => {
            dispatch({
                type: 'notifications/remove',
                id: item.id,
            })
        }, item.duration)
    }, [dispatch, item.duration, item.id])

    return (
        <Text style={[ styles.item, styles[item.kind] ]}>
            { item.message }
        </Text>
    )
}

export default Entry