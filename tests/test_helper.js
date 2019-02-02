const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'JS Blog',
        author: 'Stephen King', 
        url: 'jsblog.fi',
        likes: 69
    },
    {
        title: 'Art of crafting',
        author: 'John Crafter',
        url: 'craftworld.fi',
        likes: 420
    }
]

const nonExistingId = async () => {
    const blog = new Blog({"author": "nobody"})
    await blog.save()
    await blog.remove()
    return blog._id.toString()
}

const blogsInDB = async () => {
    return await Blog.find({})
}

const usersInDB = async () => {
    return await User.find({})
}


module.exports = {
    nonExistingId, 
    initialBlogs, 
    blogsInDB,
    usersInDB
}