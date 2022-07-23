import { StyleSheet } from 'react-native';
import { fonts } from './theme'
  
export default StyleSheet.create({
    details: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    items: {
        backgroundColor: 'rgba(205, 187, 218, 0.551)',
        padding: 5,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '10px',
        borderRadius: 5,
    },
    rating: {
        height: 45,
        width: 45,
        backgroundColor: 'rgba(233, 222, 69, 0.795)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '18px',
        borderRadius: 5,
        marginLeft: 5
    },
    user: {
        color: 'rgba(5, 35, 63, 0.894)',
        fontWeight: 'bold',
        textAlign: 'center',
        ...fonts
    },
    description: {
        backgroundColor: '#F1F1F1',
        padding: 15,
        paddingTop: 11,
        paddingBottom: 11,
        textAlign: 'justify',
        borderRadius: 5,
        marginTop: 5,
        lineHeight: 20
    }
})