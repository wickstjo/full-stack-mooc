import './styles.scss'
import { Fragment } from 'react'

const Menu = ({ actions, credentials }) => { return (
    <div id="menu">
        <div>
            <Swapper
                actions={ actions }
                credentials={ credentials }
            />
        </div>
    </div>
)}

const Swapper = ({ actions, credentials }) => {
    switch (credentials.token) {

        // NOT AUTHENTICATED, SHOW LOGIN & REGISTER
        case undefined: { return (
            <Fragment>
                <li id={ 'login' } onClick={ actions.login }>Login</li>
                <li id={ 'register' } onClick={ actions.register }>Register</li>
            </Fragment>
        )}

        // OTHERWISE, SHOW USER OPTIONS
        default: { return (
            <Fragment>
                <li id={ 'create' } onClick={ actions.create }>Create Blog</li>
                <li id={ 'logout' } onClick={ actions.logout }>Logout ({ credentials.username })</li>
            </Fragment>
        )}
    }
}

export default Menu