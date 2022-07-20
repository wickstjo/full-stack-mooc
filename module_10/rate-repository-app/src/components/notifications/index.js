import styles from '../../styles/notifications'
import { useSelector } from 'react-redux'
import { View } from 'react-native'
import Entry from './entry'

const Notifications = () => {

    // REDUX STATE
    const { notifications } = useSelector(state => state)

    switch (notifications.length > 0) {

        // NOTIFICATIONS FOUND, RENDER THEM
        case true: { return (
            <View style={ styles.notifications }>
                { notifications.map(entry =>
                    <Entry
                        key={ entry.id }
                        item={ entry }
                    />
                )}
            </View>
        )}

        // OTHERWISE, RENDER NOTHING
        default: { return null }
    }
}

export default Notifications