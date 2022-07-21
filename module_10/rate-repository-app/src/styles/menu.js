import { StyleSheet } from 'react-native';
import { fonts } from './theme'
  
export default StyleSheet.create({
    menu: {
        backgroundColor: 'rgba(0, 0, 0, 0.72)',
        height: '50px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '5px'
    },
    item: {
        flex: 1,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item_label: {
        color: 'white',
        ...fonts,
    }
})