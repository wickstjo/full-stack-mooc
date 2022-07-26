import { StyleSheet } from 'react-native';
import { fonts } from './theme'
  
export default StyleSheet.create({

    // HEADER STUFF
    upper: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgba(68, 135, 190, 0.181)',
        padding: 5,
        borderRadius: 5,
    },
    img: {
        width: 60,
        height: 60,
        resizeMode: 'stretch',
        borderRadius: 5,
    },
    details: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingRight: '10px',
    },
    shared: {
        padding: '3px',
        paddingLeft: '10px',
        ...fonts
    },
    user: {
        color: 'rgba(5, 35, 63, 0.894)',
        fontWeight: 'bold'
    },

    // FOOTER STUFF
    lower: {
        backgroundColor: '#F1F1F1',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        height: '70px',
        alignItems: 'center',
        marginTop: 5,
    },
    block: {
        flex: 1,
        textAlign: 'center',
        borderRightWidth: 1,
        borderRightColor: 'rgba(0, 0, 0, 0.08)'
    },
    count: {
        fontWeight: 'bold',
        paddingTop: 5,
        ...fonts,
    },
    type: {
        paddingTop: 5,
        ...fonts
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
    },
    button: {
        flex: 1
    }
})