const log = require('./logger.js')

// CAPTURE INCOMING REQUESTS
const request_tracker = (request, response, next) => {
    log.info(`${ request.method } => (${ request.path })`)
    next()
}

// 404 ENDPOINT
const unknown_endpoint = (request, response) => {
    response.status(404).send({
        errors: ['Unknown endpoint']
    })
}

// EXTRACT & VERIFY BEARER TOKEN FROM REQUEST HEADER
const token_extractor = (request, response, next) => {
    const authorization = request.get('authorization')

    // WHEN TOKEN IS PROVEDED, ATTACH IT TO THE REQUEST
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.bearer_token = authorization.substring(7);
    }

    next()
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

        // UNIQUE PROPERTY ERROR
        case 'MongoServerError':
            if (error.code === 11000) {
                return response.status(400).send({
                    errors: Object.keys(error.keyValue).map(
                        key => `The ${ key } is not unique`
                    )
                })
            }

        // INVALID TOKEN
        case 'JsonWebTokenError':
            return response.status(401).send({
                errors: ['Invalid bearer token']
            })

        // BEARER TOKEN EXPIRED
        case 'TokenExpiredError':
            return response.status(401).send({
                errors: ['The bearer token has expired']
            })

        // DB SERVER OFFLINE
        case 'MongooseServerSelectionError':
            return response.status(500).send({
                errors: ['MongoDB server is error']
            })
    }
    
    // OTHERWISE, LOG ERROR & PROCEED TO NEXT MIDDLEWARE
    log.error(error)
    next(error)
}

module.exports = {
    request_tracker,
    unknown_endpoint,
    error_handler,
    token_extractor
}