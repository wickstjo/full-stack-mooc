import { Text } from 'react-native'
import styles from '../../styles/reviews'
import Container from '../container'
import Details from './details'
import Buttons from './buttons'

export default ({ item }) => { return (
    <Container>
        <Details item={ item } />
        <Text style={ styles.description }>
            { item.text }
        </Text>
        <Buttons
            user={ item.ownerName }
            active={ true }
        />
    </Container>
)}