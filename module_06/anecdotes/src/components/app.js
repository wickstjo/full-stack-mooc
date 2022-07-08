import { Fragment } from 'react'
import Notifications from './notifications'
import Anecdotes from './anecdote_list'
import CreateForm from './create_form'
import Filter from './filter'

const App = () => { return (
    <Fragment>
        <Notifications />
        <CreateForm />
        <Filter />
        <Anecdotes />
    </Fragment>
)}

export default App