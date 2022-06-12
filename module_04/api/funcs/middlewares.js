const log = require('./logger.js')

// CAPTURE INCOMING REQUESTS
const request_tracker = (request, response, next) => {
    log.info(`${ request.method } => (${ request.path })`)
    next()
}

// 404 ENDPOINT
const unknown_endpoint = (request, response) => {
    response.status(404).send({
        error: 'Unknown endpoint.'
    })
}
  
// HANDLE API CRASHES
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
                errors: ['MongoDB server is unreachable']
            })
    }
    
    log.error(error)
    next(error)
}

module.exports = {
    request_tracker,
    unknown_endpoint,
    error_handler
}