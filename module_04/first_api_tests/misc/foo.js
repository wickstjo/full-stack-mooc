const blogs = require('./blogs.json')

const container = {}

blogs.forEach(blog => {
    if (container[blog.author]) {
        container[blog.author] += 1
    } else {
        container[blog.author] = 1
    }
})

const best_author = Object.keys(container).reduce(
    (best, author) => container[author] < container[best] ? best : author, -Infinity
)

console.log(result)