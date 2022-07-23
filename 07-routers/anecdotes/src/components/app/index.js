import { BrowserRouter } from 'react-router-dom';

import Menu from '../menu'
import Pages from './pages'
import Footer from '../footer'
import Notifications from '../notifications'

const App = () => { return (
    <BrowserRouter>
        <Menu />
        <Pages />
        <Footer />
        <Notifications />
    </BrowserRouter>
)}

export default App