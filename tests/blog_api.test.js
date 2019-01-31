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




afterAll(() => {
    mongoose.connection.close()
})