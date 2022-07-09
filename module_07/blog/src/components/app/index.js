import './styles.scss'
import { Fragment } from 'react'
import { BrowserRouter } from 'react-router-dom';

// import * as blog_funcs from '../../funcs/blog'
// import * as user_funcs from '../../funcs/user'

// MAIN COMPONENTS
import Menu from '../menu'
import Notifications from '../notifications'
import Prompt from '../prompt'
import Pages from '../../pages'

const App = () => { return (
    <Fragment>
        <div id={ 'main' }>
            <BrowserRouter>
                <Menu />
                <Pages />
            </BrowserRouter>
        </div>
        <Prompt />
        <Notifications />
    </Fragment>
)}

export default App