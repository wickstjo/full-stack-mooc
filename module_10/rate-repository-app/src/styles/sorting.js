import { StyleSheet } from 'react-native';
import { fonts } from './theme'
  
export default StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    shared: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        textTransform: 'uppercase',
        marginRight: 5,
        ...fonts,
    },
    inactive: {
        backgroundColor: '#CECECE',
    },
    active: {
        backgroundColor: 'rgb(151, 218, 149)',
    },
})