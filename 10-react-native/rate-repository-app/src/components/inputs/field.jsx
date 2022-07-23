import { TextInput } from 'react-native';
import styles from '../../styles/inputs'

export default (props) => { return (
    <TextInput
        { ...props }
        style={[ styles.field, props.style ]}
    />
)}