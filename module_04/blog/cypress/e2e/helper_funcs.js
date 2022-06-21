// URLS
const page_url = 'http://localhost:3000'
const db_reset_url = 'http://localhost:3001/api/testing/reset'

// GENERATE RANDOM STRING
const random_string = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i=0; i<length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
    }

    return result;
}

// POPULATE OBJECT
const populate_object = (props, string_length) => {
    const container = {}

    // POPULATE & PUSH THE PROPERTY
    props.forEach(name => {
        container[name] = random_string(string_length)
    })

    return container
}

export {
    page_url,
    db_reset_url,
    random_string,
    populate_object
}