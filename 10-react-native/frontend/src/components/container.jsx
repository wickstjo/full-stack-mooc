import { View } from 'react-native';
import styles from '../styles/general'

export default ({ children, style={} }) => { return (
    <View style={[ styles.container, style ]}>
        { children }
    </View>
)}