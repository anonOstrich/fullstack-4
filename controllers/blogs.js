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

blogsRouter.delete('/:id', async (request, response, next) => {
    const id = request.params.id
    try {
        const res =  await Blog.findByIdAndRemove(id)
        console.log("Result of deletion", res)
        return response.status(204).end()
    } catch( exception ){
        next(exception)
    } 
})


blogsRouter.put('/:id', async (request, response, next) => {
    const id = request.params.id
    const blog = {
        title: request.body.title,
        author: request.body.author || '',
        url: request.body.url,
        likes: request.body.likes || 0
    }
    try{
        const updatedBlog =  await Blog.findByIdAndUpdate(id, blog, { new: true})
        response.json(updatedBlog.toJSON())
    } catch(exception){
        next(exception)
    }
})

module.exports = blogsRouter