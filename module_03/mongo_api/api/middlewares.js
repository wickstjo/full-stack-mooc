const error_handler = (error, request, response, next) => {
    switch (error.name) {

    // CORRUPT IDS
    case 'CastError':
        return response.status(400).send({
            errors: ['Malformatted query ID']
        })

    // SCHEMA VALIDATION ERRORS
    case 'ValidationError':
        return response.status(400).send({
            errors: Object.keys(error.errors).map(
                key => error.errors[key].properties.message
            )
        })

    // DB SERVER OFFLINE
    case 'MongooseServerSelectionError':
        return response.status(500).send({
            errors: 'MongoDB server is unreachable'
        })
    }
    
    next(error)
}

module.exports = {
    error_handler
}