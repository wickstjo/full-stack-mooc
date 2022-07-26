import { View } from 'react-native'
import styles from './styles/general'

import Context from './context'
import Init from './components/init'
import Menu from './components/menu/'
import Prompts from './components/prompt/'
import Notifications from './components/notifications/'
import Pages from './pages/'

export default () => { return (
    <Context>
        <View style={ styles.body }>
            <Init />
            <Menu />
            <View style={ styles.innerbody }>
                <Pages />
            </View>
        </View>
        <Prompts />
        <Notifications />
    </Context>
)}