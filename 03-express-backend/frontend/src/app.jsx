import './ui/styles.scss'
import Redux from './redux'
import Notifications from './components/notifications'
import Phonebook from './components/phonebook'

const App = () => { return (
    <Redux>
        <Notifications />
        <Phonebook />
    </Redux>
)}

export default App