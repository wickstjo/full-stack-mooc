import { View, Text } from 'react-native';
import styles from '../../styles/menu'

export default ({ label, func }) => { return (
    <View style={ styles.item }>
        <Text onPress={ func } style={ styles.item_label }>
            { label }
        </Text>
    </View>
)}