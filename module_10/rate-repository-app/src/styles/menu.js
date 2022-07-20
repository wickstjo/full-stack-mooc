import { StyleSheet } from 'react-native';
import { fonts } from './theme'
  
export default StyleSheet.create({
    menu: {
        backgroundColor: 'rgba(0, 0, 0, 0.72)',
        height: '50px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
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
    },
    selected: {
        backgroundColor: 'rgba(14, 59, 102, 0.641)',
        flex: 1,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecorationLine: 'underline',
        ...fonts,
    }
})