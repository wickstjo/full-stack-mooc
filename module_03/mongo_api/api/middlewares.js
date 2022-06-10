const error_handler = (error, request, response, next) => {
    switch (error.name) {

        // CORRUPT IDS
        case 'CastError':
            return response.status(400).send({
                error: 'Malformatted ID'
            })

        // SCHEMA VALIDATION ERRORS
        case 'ValidationError':
            return response.status(400).send({
                error: error.message
            })

        // DB SERVER OFFLINE
        case 'MongooseServerSelectionError':
            return response.status(500).send({
                error: 'MongoDB server is unreachable'
            })
    }
    
    next(error)
}

module.exports = {
    error_handler
}