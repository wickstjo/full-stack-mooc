import { StyleSheet } from 'react-native'
  
export default StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.800)',
        position: 'absolute',
        left: '0px',
        top: '0px',
        height: '100%',
        width: '100%',
        zIndex: 99,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        width:' 80vw',
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 5
    },
    close: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginRight: 30,
        marginTop: 30
    },
    cross: {
        height: 32,
        width: 32,
    },
})