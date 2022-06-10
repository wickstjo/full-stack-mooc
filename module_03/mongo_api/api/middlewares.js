const error_handler = (error, request, response, next) => {

    // HANDLE CAST ERRORS
    if (error.name === 'CastError') {
        return response.status(400).send({
            status: 400,
            error: 'Malformatted ID'
        })
    }

    // SERVER 
    if (error.name === 'MongooseServerSelectionError') {
        return response.status(500).send({
            status: 500,
            error: 'MongoDB server unreachable'
        })
    }
    
    next(error)
}

module.exports = {
    error_handler
}