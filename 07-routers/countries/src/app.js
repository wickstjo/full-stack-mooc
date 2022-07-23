import './components/general.scss'

import useField from './hooks/field'
import useCountry from './hooks/country'

import Form from './components/form'
import Wrapper from './components/wrapper'
import { Fragment } from 'react'

const App = () => {

    // CUSTOM HOOKS
    const keyword = useField({ placeholder: 'Enter keyword' })
    const [country, count] = useCountry(keyword.value)

    return (
        <div id={ 'innerbody' }>
            <Form header={ `filter from ${ count } countries` }>
                <input { ...keyword } />
            </Form>
            <Swapper country={ country } />
        </div>
    )
}

const Swapper = ({ country }) => {
    switch (country) {

        // NOT FOUND
        case undefined: { return (
            <Wrapper header={ 'query results' }>
                <div>No results found.</div>
            </Wrapper>
        )}

        // FOUND
        default: { return (
            <Fragment>
                <Wrapper header={ 'query results' }>
                    <div>
                        <div>Name:</div>
                        <div>{ country.name.common }</div>
                    </div>
                    <div>
                        <div>Capital:</div>
                        <div>{ country.capital }</div>
                    </div>
                    <div>
                        <div>Area:</div>
                        <div>{ country.area }</div>
                    </div>
                    <div>
                        <div>Population:</div>
                        <div>{ country.population }</div>
                    </div>
                </Wrapper>
                <div id={ 'flag' }>
                    <img
                        src={ country.flags.png }
                        alt={ 'flag' }
                    />
                </div>
            </Fragment>
        )}
    }
}

export default App;