import styles from '../../styles/menu'
import { View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import useStorage from '../../hooks/storage'

import Item from './item'
import Trigger from './trigger'
import { Fragment } from 'react'


export default () => { return (
    <View style={ styles.menu }>
        <Item
            label={ 'Repositories' }
            destination={ '/repos' }
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
            <Fragment>
                <Item
                    label={ 'My Reviews' }
                    destination={ '/reviews' }
                />
                <Trigger
                    label={ `Create Review` }
                    func={() => {
                        dispatch({
                            type: 'prompts/open',
                            window: 'add_review'
                        })
                    }}
                />
                <Trigger
                    label={ `Logout (${ auth.username })` }
                    func={ logout }
                />
            </Fragment>
        )}

        default: { return (
            <Fragment>
                <Trigger
                    label={ 'Login' }
                    func={() => {
                        dispatch({
                            type: 'prompts/open',
                            window: 'login'
                        })
                    }}
                />
                <Trigger
                    label={ 'Register' }
                    func={() => {
                        dispatch({
                            type: 'prompts/open',
                            window: 'register'
                        })
                    }}
                />
            </Fragment>
        )}
    }
}