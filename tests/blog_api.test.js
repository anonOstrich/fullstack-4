const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
    await Blog.remove({})

    const promiseArray = []
    helper.initialBlogs.map(b => new Blog(b))
    .forEach(b => promiseArray.push(b.save()))

    await Promise.all(promiseArray)

})



test('all blogs are retrieved', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
})


test('blogs have property called "id"', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
})

test('new blog can be added with post', async () => {
   const newBlog = {
       title: "nouvelle blog",
       author: "Pascal Delacroix",
       url: "uusioblogio.fi",
       likes: 1888
   }

   await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

    const blogs = await helper.blogsInDB()

    expect(blogs.length).toBe(helper.initialBlogs.length + 1)

    expect(blogs.map(b => b.title)).toContain("nouvelle blog")

})



afterAll(() => {
    mongoose.connection.close()
})