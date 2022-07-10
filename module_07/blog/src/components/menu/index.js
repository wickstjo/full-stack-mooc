import './menu.scss'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Item, Trigger } from './items'

const Menu = () => { return (
    <div id="menu">
        <div>
            <Item
                label={ 'Blogs' }
                target={ 'blogs' }
            />
            <Item
                label={ 'Users' }
                target={ 'users' }
            />
            <Swapper />
        </div>
    </div>
)}

// CONDITIONAL SWAPPER
const Swapper = () => {

    // REDUX STATE
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    // LOGOUT USER
    const logout = () => {

        // TERMINATE SESSION
        dispatch({
            type: 'auth/logout'
        })

        // CREATE NOTIFICATION
        dispatch({
            type: 'notifications/positive',
            message: 'Session terminated successfully'
        })
    }

    // CONDITIONAL RENDERING
    switch (auth.session) {

        // NO SESSION, SHOW LOGIN & REGISTER
        case false: { return (
            <Fragment>
                <Trigger
                    label={ 'Login' }
                    func={() => {
                        dispatch({
                            type: 'prompts/login'
                        })
                    }}
                />
                <Trigger
                    label={ 'Register' }
                    func={() => {
                        dispatch({
                            type: 'prompts/register'
                        })
                    }}
                />
            </Fragment>
        )}

        // OTHERWISE, SHOW USER OPTIONS
        default: { return (
            <Fragment>
                <Trigger
                    label={ 'Create Blog' }
                    func={() => {
                        dispatch({
                            type: 'prompts/create'
                        })
                    }}
                />
                <Trigger
                    label={ 'Logout' }
                    func={ logout }
                />
            </Fragment>
        )}
    }
}

export default Menu