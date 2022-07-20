import { View } from 'react-native'
import styles from '../../styles/menu'
//import Constants from 'expo-constants';

import Item from './item'

export default () => { return (
    <View style={ styles.menu }>
        <Item
            label={ 'Repositories' }
            destination={ '/repos' }
        />
        <Item
            label={ 'Reviews' }
            destination={ '/reviews' }
        />
        <Item
            label={ 'Login' }
            destination={ '/login' }
        />
    </View>
)};