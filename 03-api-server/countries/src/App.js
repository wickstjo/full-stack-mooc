import { Fragment, useState, useEffect } from 'react'
import './css/general.scss'
import axios from 'axios'

import Header from './components/Header';
import Field from './components/Field';
import Splitter from './components/Splitter';
import Country from './components/Country';

const App = () => {

    // LIST OF COUNTRIES
    const [data, set_data] = useState([])

    // LOAD DATA FROM API
    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all').then(response => {
            set_data(response.data)
        })
    }, [])

    // INPUT STATES
    const [filter, set_filter] = useState('')

    return (
        <Fragment>
            <Splitter
                first={
                    <Header text={ 'Filter Country by Name' } />
                }
                second={
                    <Field
                        label={ 'For example, "Finland"' }
                        value={ filter }
                        func={
                            event => set_filter(event.target.value)
                        }
                    />
                }
            />
            <div className={ 'result' }>
                <Result
                    data={ data }
                    keyword={ filter }
                    set_keyword={ set_filter }
                />
            </div>
        </Fragment>
    )
}

const Result = ({ data, keyword, set_keyword }) => {

    // FILTER OUT GARBAGE -- FORCE LOWERCASE
    const filtered = data.filter(
        item => item.name.common.toLowerCase().includes(keyword.toLowerCase())
    )
    
    if (keyword === '') { 
        return null;

    // TOO MANY MATCHES
    } else if (filtered.length > 10) { return (
        <Fragment>
            <Header text={ 'Query Result' } />
            <li>Too many results with keyword "{ keyword }"</li>
        </Fragment>

    // BETWEEN 2 AND 10 RESULTS
    )} else if (filtered.length > 1 && filtered.length < 10) { return (
        <Fragment>
            <Header text={ 'Countries' } />
            { filtered.map(item =>
                <li key={ item.name.common }>
                    <span className={ 'padded' }>{ item.name.common }</span>
                    <Button
                        label={ 'show' }
                        func={ () => set_keyword(item.name.common) }
                    />
                </li>
            )}
        </Fragment>
    
    // OTHERWISE, PRESENT SINGLE COUNTRY
    )} else if (filtered.length === 1) { return (
        <Country target={ filtered[0] } />
    
    // OTHERWISE, RENDER NOTHING
    )} else { return null }
}

const Button = ({ label, func }) => { return (
    <button onClick={ func }>{ label }</button>
)}

export default App;