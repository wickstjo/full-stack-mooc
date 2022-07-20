import { StyleSheet } from 'react-native'
import { fonts } from './theme'

export default StyleSheet.create({
    body: {
        backgroundColor: 'rrgba(0, 0, 0, 0.100)',
        color: 'white',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    innerbody: {
        flex: 1,
        position: 'relative'
    },
    scroller: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        overflow: 'auto'
    },
    container: {
        backgroundColor: 'white',
        padding: '5px',
        marginBottom: '5px'
    },
    header: {
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        padding: '15px',
        color: 'white',
        borderRadius: '5px',
        marginBottom: '5px',
        textTransform: 'uppercase',
        textAlign: 'center',
        ...fonts,
    },
    filter: {
        paddingLeft: '5px',
        paddingRight: '5px',
    },
    search: {
        backgroundColor: 'white',
        marginTop: '5px',
    },
})