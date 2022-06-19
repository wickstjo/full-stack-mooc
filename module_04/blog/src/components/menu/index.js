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
                <li onClick={ actions.login }>Login</li>
                <li onClick={ actions.register }>Register</li>
            </Fragment>
        )}

        // OTHERWISE, SHOW USER OPTIONS
        default: { return (
            <Fragment>
                <li onClick={ actions.create }>Create Blog</li>
                <li onClick={ actions.logout }>Logout ({ credentials.username })</li>
            </Fragment>
        )}
    }
}

export default Menu