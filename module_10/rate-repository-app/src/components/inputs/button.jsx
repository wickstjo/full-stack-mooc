import { Text, Pressable } from 'react-native';
import styles from '../../styles/inputs'

export default ({ label, func }) => { return (
    <Pressable onPress={ func } style={ styles.button }>
        <Text>{ label }</Text>
    </Pressable>
)}