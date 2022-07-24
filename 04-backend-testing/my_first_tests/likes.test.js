const helper = require('./misc/helpers')
const blogs = require('./misc/blogs.json')

describe('Blog likes tests', () => {

    test('For first blog', () => {
        const result = helper.total_likes([blogs[0]])
        expect(result).toBe(7)
    })

    test('For last blog', () => {
        const result = helper.total_likes([blogs[5]])
        expect(result).toBe(2)
    })

    test('For all blogs', () => {
        const result = helper.total_likes(blogs)
        expect(result).toBe(36)
    })

    test('For no blogs', () => {
        const result = helper.total_likes([])
        expect(result).toBe(0)
    })
})