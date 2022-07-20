import { StyleSheet } from 'react-native';
import { fonts } from './theme'
  
export default StyleSheet.create({

    // HEADER STUFF
    upper: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgba(68, 135, 190, 0.181)',
        padding: '5px',
        borderRadius: '5px',
    },
    img: {
        width: 60,
        height: 60,
        resizeMode: 'stretch',
        borderRadius: '5px',
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
        display: 'flex',
        flexDirection: 'row',
        height: '70px',
        alignItems: 'center',
    },
    block: {
        flex: 1,
        textAlign: 'center',
    },
    count: {
        fontWeight: 'bold',
        paddingTop: '5px',
        ...fonts,
    },
    type: {
        paddingTop: '5px',
        ...fonts
    }
})