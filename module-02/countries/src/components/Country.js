import { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import Header from './Header';

const Country = ({ target }) => { return (
    <Fragment>
        <Stats target={ target } />
        <Languages target={ target } />
        <Flag target={ target } />
        <Weather target={ target } />
    </Fragment>
)}

const Weather = ({ target }) => {

    // WEATHER DATA
    const [weather, set_weather] = useState({
        temp: 0,
        wind: 0,
        icon: 0
    })

    // ON LOAD..
    useEffect(() => {
        const api_key = process.env.REACT_APP_WEATHER_API;
        const call = `https://api.openweathermap.org/data/2.5/weather?q=${ target.name.common }&units=metric&APPID=${ api_key }`

        // FETCH WEATHER STATS FOR CITY & SET IN STATE
        axios.get(call).then(response => {
            set_weather({
                temp: response.data.main.temp,
                wind: response.data.wind.speed,
                icon: response.data.weather[0].icon
            })
        })

    }, [target])

    return (
        <Fragment>
            <br />
            <br />
            <Header text={ 'Weather' } />
            <li>Temperature: { weather.temp } C</li>
            <li>Wind: { weather.wind } m/s</li>
            <img
                src={ `https://openweathermap.org/img/wn/${ weather.icon }.png` }
                alt={ 'foo' }
            />
        </Fragment>
    )
}

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