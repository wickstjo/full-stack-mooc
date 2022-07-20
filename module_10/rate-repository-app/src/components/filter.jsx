import { View } from 'react-native'
import styles from '../styles/general'
import Field from './inputs/field'

export default ({ field }) => { return (
    <View style={ styles.filter }>
        <Field { ...field } style={ styles.search } />
    </View>
)}