const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    request.body.likes = request.body.likes || 0
    const blog = new Blog(request.body)
    

    await blog.save()
    response.status(201).json(blog.toJSON())
})


module.exports = blogsRouter