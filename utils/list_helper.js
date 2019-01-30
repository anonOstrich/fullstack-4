const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes,
         0);
}

const favoriteBlog = (blogs) => {
    return blogs.map(blog => {
        return {
            title: blog.title, 
            author: blog.author, 
            likes: blog.likes,
        }
    })
    .sort((e1, e2) => e2.likes - e1.likes)[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}