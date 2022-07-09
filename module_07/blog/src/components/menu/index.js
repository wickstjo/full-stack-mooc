import './styles.scss'
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

    const logout = () => {
        dispatch({
            type: 'auth/logout'
        })
    }

    // CONDITIONAL RENDERING
    switch (auth.session) {

        // NO SESSION, SHOW LOGIN & REGISTER
        case false: { return (
            <Fragment>
                <Item
                    label={ 'Login' }
                    target={ 'login' }
                />
                <Item
                    label={ 'Register' }
                    target={ 'register' }
                />
            </Fragment>
        )}

        // OTHERWISE, SHOW USER OPTIONS
        default: { return (
            <Fragment>
                <Item
                    label={ 'Create Blog' }
                    target={ 'create' }
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