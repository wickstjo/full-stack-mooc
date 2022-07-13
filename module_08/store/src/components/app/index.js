import { BrowserRouter } from 'react-router-dom';

import Menu from '../menu'
import Pages from './pages'
import Notifications from '../notifications'
import Prompt from '../prompt'

const App = () => { return (
    <BrowserRouter>
        <Menu />
        <Pages />
        <Prompt />
        <Notifications />
    </BrowserRouter>
)}

export default App