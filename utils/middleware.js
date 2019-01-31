const errorHandler = (error, request, response, next) => {
    if(error.name === 'ValidationError' && error.message.includes('Blog')){
        return response.status(400).send({error: error.message})
    }
    next(error)
}


module.exports = {
    errorHandler
}