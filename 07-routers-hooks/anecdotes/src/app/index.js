import { BrowserRouter } from 'react-router-dom';

import Menu from '../components/menu'
import Notifications from '../components/notifications'
import Pages from './pages'
import Footer from '../components/footer'

const App = () => { return (
    <BrowserRouter>
        <Menu />
        <Pages />
        <Footer />
        <Notifications />
    </BrowserRouter>
)}

export default App