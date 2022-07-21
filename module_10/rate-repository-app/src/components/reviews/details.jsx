import styles from '../../styles/reviews'
import { Text, View } from 'react-native'
import { format_date } from '../../funcs/misc'

export default ({ item }) => { return (
    <View style={ styles.details }>
        <View style={ styles.items }>
            <Text style={ styles.user }>{ item.user.username } @ { format_date(item.createdAt) }</Text>
        </View>
        <Text style={ styles.rating }>{ item.rating }</Text>
    </View>
)}