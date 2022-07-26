import { Text } from 'react-native';
import styles from '../styles/general';

export default ({ text }) => { return (
    <Text style={ styles.header }>
        { text }
    </Text>
)}