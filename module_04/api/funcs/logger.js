// CREATE TIMESTAMP
const create_timestamp = () => {
    const base = new Date()

    // PAD PARTS
    const hrs = String(base.getHours()).padStart(2, '0')
    const mins = String(base.getMinutes()).padStart(2, '0')
    const secs = String(base.getSeconds()).padStart(2, '0')

    // RETURN AS UNIFIED STRING
    return `[${ hrs }:${ mins }:${ secs }]`
}

// BASIC LOGGING
const info = (...params) => {
    const timestamp = create_timestamp()
    console.log(timestamp, ...params)
}

// THREAT LOGGING
const error = (...params) => {
    const timestamp = create_timestamp()
    console.error(timestamp, ...params)
}

module.exports = {
    info,
    error
}