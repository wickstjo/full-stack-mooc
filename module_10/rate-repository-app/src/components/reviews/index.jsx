import { Text, View } from 'react-native'
import styles from '../../styles/reviews'
import Container from '../container'
import Details from './details'
import Buttons from './buttons'

export default ({ item, refetch=false }) => { return (
    <Container>
        <Details item={ item } />
        { item.text ?
            <View>
                <Text style={ styles.description }>
                    { item.text }
                </Text>
            </View>
        : null }
        { refetch &&
            <Buttons
                item={ item }
                refetch={ refetch }
            />
        }
    </Container>
)}