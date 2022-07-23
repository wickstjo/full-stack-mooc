import { Fragment } from 'react'
import Wrapper from './wrapper'
import useResource from '../hooks/resource'

const Country = ({ target }) => {

    // FETCH API KEY FROM ENV
    const api_key = process.env.REACT_APP_API_KEY;

    // FETCH WEATHER DATA
    const [weather_data] = useResource({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${ target.name.common }&units=metric&APPID=${ api_key }`,
        extract: (response) => {
            return {
                temp: response.main.temp,
                wind: response.wind.speed,
                icon: response.weather[0].icon
            }
        }
    })

    return (
        <Fragment>
            <Wrapper header={ target.name.common }>
                <div>
                    <div>Capital:</div>
                    <div>{ target.capital }</div>
                </div>
                <div>
                    <div>Area:</div>
                    <div>{ target.area }</div>
                </div>
                <div>
                    <div>Languages:</div>
                    <div>{ Object.values(target.languages).join(', ') }</div>
                </div>
            </Wrapper>
            <Wrapper header={ 'weather data' }>
                <div>
                    <div>Temperature:</div>
                    <div>
                        { weather_data.temp }
                        <img
                            src={ `https://openweathermap.org/img/wn/${ weather_data.icon }.png` }
                            alt={ 'foo' }
                            id={ 'small' }
                        />
                    </div>
                </div>
                <div>
                    <div>Wind:</div>
                    <div>{ weather_data.wind }</div>
                </div>
            </Wrapper>
            <img
                src={ target.flags.png }
                alt={ 'foo' }
            />
        </Fragment>
    )
}

export default Country