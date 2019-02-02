const errorHandler = (error, request, response, next) => {
    if(error.name === 'ValidationError'){
        return response.status(400).send({error: error.message})
    } 

    if(error.name === 'CastError' && error.kind === 'ObjectId'){
        return response.status(400).json({error: 'malformatted id'})
    }
    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        request.token =  authorization.substring(7)
    } else {
        request.token = null
    }

    next()
}


module.exports = {
    errorHandler,
    tokenExtractor
}