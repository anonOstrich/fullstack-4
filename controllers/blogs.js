const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(b => b.toJSON()))
})



blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    try{
        console.log('Token in requeset', request.token)
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if(!request.token || !decodedToken.id){
            return response.status(401).json({error: 'token missing or invalid'})
        }



        const user =  await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title, 
        likes: body.likes || 0,
        author: body.author,
        url: body.url,
        user: user._id
    })
    await blog.save()
    user.blogs = user.blogs.concat(blog)
    await user.save()
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