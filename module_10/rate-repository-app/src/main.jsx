import { View } from 'react-native'
import { NativeRouter } from 'react-router-native'
import styles from './styles/general'

import Apollo from './apollo'
import Redux from './redux/'

import Init from './components/init'
import Menu from './components/menu/'
import Notifications from './components/notifications/'
import Pages from './components/pages'

export default () => { return (
    <Apollo>
        <Redux>
            <NativeRouter>
                <View style={ styles.body }>
                    <Init />
                    <Menu />
                    <View style={ styles.innerbody }>
                        <Pages />
                    </View>
                </View>
                <Notifications />
            </NativeRouter>
        </Redux>
    </Apollo>
)}