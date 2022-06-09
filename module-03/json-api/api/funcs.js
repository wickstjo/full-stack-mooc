// GENERATE DB ID
const create_id = (db) => {
    let largest = 0;

    // FIND LARGEST DB ID
    if (db.length > 0) {
        largest = Math.max(
            ...db.map(item => item.id)
        )
    }

    return largest + 1
}

// RANDOM ID
const random_id = () => {
    return Math.floor(Math.random() * 10**10);
}

// VALIDATE JSON PROPERTIES
const validate_props = (required_props, input, db) => {
    const errors = []
    const keys = Object.keys(input)

    // LOOP THROUGH REQUIRED PROPERTIES
    for (let property of required_props) {

        // CHECK WHETHER THE PROPERTY
        if (!keys.includes(property)) {
            errors.push(`The property "${ property }" is required!`)
            continue
        }

        // CHECK WHETHER THE PROPERTY
        if (input[property].length < 2 || input[property].length > 15) {
            errors.push(`The property "${ property }" must be between 2 and 15 characters!`)
            continue
        }

        // CHECK UNIQUENESS
        if (db.find(item => item[property] === input[property])) {
            errors.push(`This "${ property }" already exists!`)
        }
    }

    return errors
}

module.exports = {
    create_id,
    random_id,
    validate_props
}