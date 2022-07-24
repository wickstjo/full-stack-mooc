import './menu.scss'
import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Menu = () => { return (
    <div id="menu">
        <div>
            <Swapper />
        </div>
    </div>
)}

const Swapper = () => {

    // AUXILLARY
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    // PROMPT SHORTHAND
    const open_prompt = (window) => {
        dispatch({
            type: 'prompts/open',
            window
        })
    }

    // LOGOUT SHORTHAND
    const logout = () => {
        dispatch({
            type: 'auth/logout',
        })
    }

    switch (auth.session) {

        // NOT AUTHENTICATED, SHOW LOGIN & REGISTER
        case true: { return (
            <Fragment>
                <li id={ 'create' } onClick={ () => open_prompt('create_blog') }>Create Blog</li>
                <li id={ 'logout' } onClick={ logout }>Logout ({ auth.username })</li>
            </Fragment>
        )}

        // OTHERWISE, SHOW USER OPTIONS
        default: { return (
            <Fragment>
                <li id={ 'login' } onClick={ () => open_prompt('login') }>Login</li>
                <li id={ 'register' } onClick={ () => open_prompt('register') }>Register</li>
            </Fragment>
        )}
    }
}

export default Menu