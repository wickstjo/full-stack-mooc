import styles from '../../styles/notifications'
import { useSelector } from 'react-redux'
import { View } from 'react-native'
import Entry from './entry'

const Notifications = () => {

    // REDUX STATE
    const { notifications, prompts } = useSelector(state => state)

    // REMOVE BACKGROUND WHEN PROMPT IS ENABLED
    const secondary = prompts ? { backgroundColor: 'transparent' } : null

    switch (notifications.length > 0) {

        // NOTIFICATIONS FOUND, RENDER THEM
        case true: { return (
            <View style={[ styles.notifications, secondary ]}>
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