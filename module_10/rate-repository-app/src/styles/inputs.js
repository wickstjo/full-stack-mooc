import { StyleSheet } from 'react-native';
import { fonts } from './theme'
  
export default StyleSheet.create({
    field: {
        padding: '10px',
        backgroundColor: 'rgb(228, 228, 228)',
        marginBottom: '5px',
        borderRadius: '5px',
        outlineStyle: 'none',
        borderColor: 'background: rgba(0, 0, 0, 0.259);',
        borderWidth: '1px',
        ...fonts,
    },
    button: {
        padding: '10px',
        backgroundColor: 'rgba(68, 135, 190, 0.281)',
        borderRadius: '5px',
        textAlign: 'center',
        textTransform: 'uppercase',
        borderColor: 'background: rgba(0, 0, 0, 0.259);',
        borderWidth: '1px',
        ...fonts,
    }
})