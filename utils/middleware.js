const errorHandler = (error, request, response, next) => {
    if(error.name === 'ValidationError'){
        return response.status(400).send({error: error.message})
    } 

    if(error.name === 'CastError' && error.kind === 'ObjectId'){
        return response.status(400).json({error: 'malformatted id'})
    }
    next(error)
}


module.exports = {
    errorHandler
}