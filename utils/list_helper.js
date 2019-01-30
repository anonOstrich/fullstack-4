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

const mostBlogs = (blogs) => {

    const reducer = (authorInfo, name) => {
        let info = authorInfo.find(info => info.author === name)
        if(!info){
            info = {author: name, blogs: 0}
            authorInfo.push(info)
        }
        info.blogs++; 
        return authorInfo; 
    }

   return  blogs.map(blog => blog.author)
    .reduce(reducer, [])
    .sort((a1, a2) => a2.blogs - a1.blogs)[0]
    
}

const mostLikes = (blogs) => {
    const likeReducer = (authorInfo, blog) => {
        const author = blog.author
        let info = authorInfo.find(i => i.author === author)
        if(!info){
            info = {author: author, likes: 0}
            authorInfo.push(info)
        }
        info.likes += blog.likes
        return authorInfo
    }

    return blogs.reduce(likeReducer, []).sort((i1, i2) => i2.likes - i1.likes)[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog, 
    mostBlogs, 
    mostLikes
}