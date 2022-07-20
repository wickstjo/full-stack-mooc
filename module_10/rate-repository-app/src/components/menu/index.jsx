import styles from '../../styles/menu'
import { View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import useStorage from '../../hooks/storage'

import Item from './item'
import Trigger from './trigger'


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
        <Swapper />
    </View>
)};

const Swapper = () => {

    // GLOBAL STATE
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const storage = useStorage()

    // LOGOUT
    const logout = async () => {

        // NUKE STORAGE
        await storage.remove()

        // LOGOUT IN STATE
        dispatch({
            type: 'auth/logout'
        })

        // NOTIFY
        dispatch({
            type: 'notifications/positive',
            message: 'Successfully logged out!'
        })
    }
    
    switch (auth.session) {

        case true: { return (
            <Trigger
                label={ `Logout (${ auth.username })` }
                func={ logout }
            />
        )}

        default: { return (
            <Item
                label={ 'Login' }
                destination={ '/login' }
            />
        )}
    }
}