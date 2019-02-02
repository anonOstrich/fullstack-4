const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)


describe('blog related tests', async () => {

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

test('new blog has number of likes 0 by default', async () => {
    const blog = {
        title: 'Blog of blogs', 
        author: 'master of masters',
        url: 'mystery.xxx'
    }

    const result = await api.post('/api/blogs')
    .send(blog).expect(201)

    expect(result.body.likes).toBe(0)
})


test('blog without title or url cannot be added', async () => {
    const failBlog = {
        author: 'Pseudo Nym', 
        likes: 100
    }

    await api.post('/api/blogs')
    .send(failBlog).expect(400)
})


test('blog can be deleted with valid id', async () => {
    const blogsAtStart = await helper.blogsInDB()
    console.log("Are there blogs? ", blogsAtStart)
    let delId= blogsAtStart[0]._id.toString()
    console.log("delete id", delId)
    const c = await api
        .delete(`/api/blogs/${delId}`)
        .expect(204)

    const blogs = await helper.blogsInDB()
    console.log("blogs after delete?", blogs)
    expect(blogs.length).toBe(helper.initialBlogs.length - 1)
})

})

describe('when one user exists', async () => {

    beforeEach(async () => {
        await User.remove({})
        const user = {
            username: 'fullstack',
            name: 'Jouni',
            passwordHash:  await bcrypt.hash('smetana', 10)
        }
        await user.save()
    })

    test('valid user can be added successfully', async () => {
        expect(1).toBe(0);
    })

    test('user with nonunique username is not added and proper status is returned', async () => {
        expect(0).toBe(1)
    })

    test('user with missing required fields is not added and proper status is returned', () => {
        expect(0).toBe(1)
    })

    test('user with too short password cannot be added', async () => {
        expect(0).toBe(1)
    })

    test('user with too short username cannot be added', async () => {
        expect(0).toBe(1)
    })

})



afterAll(async () => {
    await Blog.remove({})
    mongoose.connection.close()
})