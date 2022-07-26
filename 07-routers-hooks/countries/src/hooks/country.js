import { useState, useEffect } from 'react'
import axios from 'axios'

const useCountry = (keyword) => {

    // CONTAINER STATES
    const [database, set_db] = useState([])
    const [result, set_result] = useState(undefined)

    // FETCH ALL COUNTRIES ONCE
    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all').then(response => {
            set_db(response.data)
        })
    }, [])

    // WHEN KEYWORD UPDATES, ATTEMPT TO FIND COUNTRY
    useEffect(() => {
        const subset = database.find(country => country.name.common.toLowerCase() === keyword.toLowerCase())
        set_result(subset)
    }, [keyword, database])

    return [result, database.length]
}

export default useCountry