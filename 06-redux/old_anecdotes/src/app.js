import { Fragment } from 'react'
import Notifications from './components/notifications'
import Anecdotes from './components/anecdote_list'
import CreateForm from './components/create_form'
import Filter from './components/filter'

const App = () => { return (
    <Fragment>
        <Notifications />
        <CreateForm />
        <Filter />
        <Anecdotes />
    </Fragment>
)}

export default App