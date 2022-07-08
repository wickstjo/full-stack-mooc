import { Fragment } from 'react'
import Anecdotes from './anecdote_list'
import CreateForm from './create_form'

const App = () => { return (
    <Fragment>
        <Anecdotes />
        <CreateForm />
    </Fragment>
)}

export default App