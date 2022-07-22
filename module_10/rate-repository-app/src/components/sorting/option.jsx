import { Text, Pressable } from 'react-native';
import styles from '../../styles/sorting'

export default ({ label, payload, style={} }) => {

    // DESTRUCTURE PAYLOAD
    const [ swapper, current ] = payload

    // ACTIVE STATUS
    const secondary = (current === label) ? styles.active : styles.inactive

    return (
        <Pressable onPress={ () => swapper(label) } style={[ styles.shared, secondary, style ]}>
            <Text>{ label }</Text>
        </Pressable>
    )
}