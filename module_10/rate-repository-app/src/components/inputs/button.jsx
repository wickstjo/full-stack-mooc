import { Text, Pressable } from 'react-native';
import styles from '../../styles/inputs'

export default ({ label, func, disabled=false, style={} }) => {

    // PICK SECONDARY STYLE
    const secondary_style = disabled ? styles.error : styles.success

    return (
        <Pressable onPress={ func } style={[ styles.button, secondary_style, style ]} disabled={ disabled }>
            <Text>{ label }</Text>
        </Pressable>
    )
}