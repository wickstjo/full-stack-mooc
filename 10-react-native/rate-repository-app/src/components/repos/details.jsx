import { View, Text, Image } from 'react-native'
import { Link } from 'react-router-native'
import styles from '../../styles/repos'

export default ({ id, img, lang, user }) => { return (
    <Link to={ `/repos/${ id }` }>
        <View style={ styles.upper }>
            <View style={ styles.details }>
                <Text style={[ styles.shared, styles.user ]}>{ user }</Text>
                <Text style={ styles.shared }>{ lang }</Text>
            </View>
            <Image
                style={ styles.img }
                source={{
                    uri: img
                }}
            />
        </View>
    </Link>
)}