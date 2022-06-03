import { Fragment } from 'react'
import Header from './Header';

const Country = ({ target }) => { return (
    <Fragment>
        <Stats target={ target } />
        <Languages target={ target } />
        <Flag target={ target } />
    </Fragment>
)}

const Stats = ({ target }) => { return (
    <Fragment>
        <Header text={ target.name.common } />
        <li>Capital: { target.capital }</li>
        <li>Area: { target.area }</li>
        <br />
    </Fragment>
)}

const Languages = ({ target }) => { return (
    <Fragment>
        <Header text={ 'Languages' } />
        { Object.keys(target.languages).map(abbr =>
            <li key={ abbr }>{ target.languages[abbr] }</li>
        )}
        <br />
    </Fragment>
)}

const Flag = ({ target }) => { return (
    <Fragment>
        <Header text={ 'Flag' } />
        <img
            src={ target.flags.png }
            alt={ 'foo' }
        />
    </Fragment>
)}

export default Country;