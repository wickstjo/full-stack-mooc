import { View, Text } from 'react-native';
import { Link, useLocation } from 'react-router-native';
import styles from '../../styles/menu'

export default ({ label, destination }) => {

    const { pathname } = useLocation()
    const current = pathname.startsWith(destination)

    return (
        <View style={ current ? styles.selected : styles.item }>
            <Link to={ destination }>
                <Text style={ styles.item_label }>{ label }</Text>
            </Link>
        </View>
    )
}