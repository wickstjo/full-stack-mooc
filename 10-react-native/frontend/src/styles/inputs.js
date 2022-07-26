import { StyleSheet } from 'react-native';
import { fonts } from './theme'
  
export default StyleSheet.create({
    field: {
        padding: 10,
        backgroundColor: 'rgb(228, 228, 228)',
        marginBottom: '5px',
        borderRadius: 5,
        // outlineStyle: 'none',
        ...fonts,
    },
    button: {
        padding: 10,
        // backgroundColor: 'rgba(68, 135, 190, 0.281)',
        borderRadius: 5,
        textAlign: 'center',
        textTransform: 'uppercase',
        ...fonts,
    },
    error: {
        backgroundColor: 'rgb(218, 149, 149)',
    },
    success: {
        backgroundColor: 'rgb(151, 218, 149)',
    },
    func: {
        backgroundColor: 'rgba(47, 126, 190, 0.692)',
    },
    header: {
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        padding: 10,
        color: 'white',
        borderRadius: 5,
        marginBottom: '5px',
        textTransform: 'uppercase',
        textAlign: 'center',
        ...fonts,
    },
})