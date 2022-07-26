import { StyleSheet } from 'react-native'
import { fonts } from './theme'

export default StyleSheet.create({
    notifications: {
        backgroundColor: 'rgba(0, 0, 0, 0.800)',
        position: 'absolute',
        bottom: '0px',
        left: '0px',
        zIndex: '100',
        padding: '10px',
        paddingTop: '5px',
        width: '100%',
    },
    item: {
        padding: '10px',
        marginTop: '5px',
        borderRadius: '5px',
        ...fonts,
    },
    negative: {
        backgroundColor: 'rgb(218, 149, 149)',
    },
    positive: {
        backgroundColor: 'rgb(151, 218, 149)',
    }
})