// COUNT TOTAL NUMBER OF LIKES
const total_likes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

// FIND THE MOST LIKED BLOG
const most_likes = (blogs) => {

    // WORST CASE
    const basecase = {
        likes: -Infinity
    }
    
    // FIND BLOG WITH MOST LIKES
    return blogs.reduce(
        (best, blog) => blog.likes > best.likes ? blog : best, basecase
    )
}

// FIND THE LEAST LIKED BLOG
const least_likes = (blogs) => {

    // WORST CASE
    const basecase = {
        likes: Infinity
    }
    
    // FIND BLOG WITH MOST LIKES
    return blogs.reduce(
        (best, blog) => blog.likes < best.likes ? blog : best, basecase
    )
}
 
// FIND THE MOST FREQUENT AUTHOR
const most_frequent_author = (blogs) => {
    const container = {}

    // COUNT OCCURRENCE OF EACH AUTHOR
    blogs.forEach(blog => {
        if (container[blog.author]) {
            container[blog.author] += 1
        } else {
            container[blog.author] = 1
        }
    })

    // FIND THE MOST POPULAR
    const best_author = Object.keys(container).reduce(
        (best, author) => container[author] < container[best] ? best : author, -Infinity
    )

    return {
        author: best_author,
        blogs: container[best_author]
    }
}

// FIND THE MOST FREQUENT AUTHOR
const most_liked_author = (blogs) => {
    const container = {}

    // COUNT AUTHORS CUMULATIVE LIKES
    blogs.forEach(blog => {
        if (container[blog.author]) {
            container[blog.author] += blog.likes
        } else {
            container[blog.author] = blog.likes
        }
    })

    // FIND THE MOST POPULAR
    const best_author = Object.keys(container).reduce(
        (best, author) => container[author] < container[best] ? best : author, -Infinity
    )

    return {
        author: best_author,
        likes: container[best_author]
    }
}

module.exports = {
    total_likes,
    most_likes,
    least_likes,
    most_frequent_author,
    most_liked_author
}