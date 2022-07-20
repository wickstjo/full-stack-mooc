import { View } from 'react-native';
import styles from '../styles/general'

export default ({ children }) => { return (
    <View style={ styles.scroller }>
        { children }
    </View>
)}