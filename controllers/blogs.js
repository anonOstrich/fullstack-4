const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
    request.body.likes = request.body.likes || 0
    const blog = new Blog(request.body)
    
    try{
    await blog.save()
    response.status(201).json(blog.toJSON())
    } catch(exception){
        next(exception)
    }
})

blogsRouter.use(middleware.errorHandler)


module.exports = blogsRouter