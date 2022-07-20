import { View, Text } from 'react-native'
import styles from '../../styles/repos'
import { shorten } from '../../funcs/misc'

export default ({ item }) => { return (
    <View style={ styles.lower }>
        <Item
            label={ 'Stars' }
            count={ item.stargazersCount }
        />
        <Item
            label={ 'Forks' }
            count={ item.forksCount }
        />
        <Item
            label={ 'Reviews' }
            count={ item.reviewCount }
        />
        <Item
            label={ 'Rating' }
            count={ item.ratingAverage }
        />
    </View>
)}

const Item = ({ label, count }) => { return (
    <View style={ styles.block }>
        <Text style={ styles.count }>{ shorten(count) }</Text>
        <Text style={ styles.type }>{ label }</Text>
    </View>
)}