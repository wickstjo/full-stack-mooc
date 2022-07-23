import { View } from 'react-native'
import { NativeRouter } from 'react-router-native'
import styles from './styles/general'

import Apollo from './apollo'
import Redux from './redux/'

import Init from './components/init'
import Menu from './components/menu/'
import Prompts from './components/prompt/'
import Notifications from './components/notifications/'
import Pages from './pages/'

export default () => { return (
    <Redux>
        <Apollo>
            <NativeRouter>
                <View style={ styles.body }>
                    <Init />
                    <Menu />
                    <View style={ styles.innerbody }>
                        <Pages />
                    </View>
                </View>
                <Prompts />
                <Notifications />
            </NativeRouter>
        </Apollo>
    </Redux>
)}