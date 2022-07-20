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
        paddingTop: '5px'
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
    },
    error: {
        backgroundColor: 'rgba(255, 176, 176, 0.602)',
        padding: '10px',
        marginBottom: '5px',
        borderRadius: '5px',
        borderColor: 'background: rgba(0, 0, 0, 0.259);',
        borderWidth: '1px',
        ...fonts,
    }
})