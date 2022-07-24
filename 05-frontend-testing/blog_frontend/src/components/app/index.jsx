import './general.scss'

import Redux from '../../redux'
import Menu from '../menu'
import Blogs from '../blogs'

import Init from '../init'
import Prompt from '../prompt'
import Notifications from '../notifications'

const App = () => { return (
    <Redux>
        <div id={ 'main' }>
            <Menu />
            <div id={ 'container' }>
                <div id={ 'inner' }>
                    <Blogs />
                </div>
            </div>
        </div>
        <Init />
        <Prompt />
        <Notifications />
    </Redux>
)}

export default App