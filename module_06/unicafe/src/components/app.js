import { Fragment } from 'react';
import Header from './header'
import Buttons from './buttons'
import Stats from './stats'

const App = () => { return (
    <Fragment>
        <Header text={ 'Give Feedback' } />
        <Buttons
            keys={[
                'good',
                'neutral',
                'bad'
            ]}
        />
        <Header text={ 'Statistics' } />
        <Stats />
    </Fragment>
)}

export default App