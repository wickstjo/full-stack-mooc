import { StyleSheet } from 'react-native'
import { fonts } from './theme'
import Constants from 'expo-constants';
  
export default StyleSheet.create({
    menu: {
        backgroundColor: 'rgba(0, 0, 0, 0.72)',
        minHeight: '100px',
        flexDirection: 'row',
        marginBottom: '5px',
        overflow: 'auto',
        paddingBottom: 10,
        paddingLeft: 10,
        paddingTop: Constants.statusBarHeight,
    },
    item: {
        justifyContent: 'end',
        marginRight: 5
    },
    item_label: {
        backgroundColor: 'rgba(0, 0, 0, 0.22)',
        borderRadius: 5,
        padding: 8,
        paddingLeft: 12,
        paddingRight: 12,
        color: '#CECECE',
        ...fonts,
    },
    selected: {
        textDecorationLine: 'underline',
        color: 'white'
    }
})