import { View, Text } from 'react-native';
import { Link, useLocation } from 'react-router-native';
import styles from '../../styles/menu'

export default ({ label, destination }) => { return (
    <View style={ styles.item }>
        <Link to={ destination }>
            <Text style={ styles.item_label }>{ label }</Text>
        </Link>
    </View>
)}