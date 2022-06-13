const helper = require('./misc/helpers')
const blogs = require('./misc/blogs.json')

describe('Blog popularity tests', () => {

    // --------------------------------------------------
    // MOST POPULAR BLOG
    // --------------------------------------------------

    test('Most popular blog', () => {
        const result = helper.most_likes(blogs)

        // CHECK FOR OBJECT MATCH
        expect(result).toEqual({
            "id": "5a422b3a1b54a676234d17f9",
            "title": "Canonical string reduction",
            "author": "Edsger W. Dijkstra",
            "url": "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            "likes": 12
        })
    })

    test('Most popular blog (incorrect)', () => {
        const result = helper.most_likes(blogs)

        // CHECK FOR OBJECT MATCH
        expect(result).not.toEqual({
            "id": "5a422bc61b54a676234d17fc",
            "title": "Type wars",
            "author": "Robert C. Martin",
            "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            "likes": 2
        })
    })

    test('Most popular with no entries', () => {
        const result = helper.most_likes([])
        expect(result.likes).toBe(-Infinity)
    })

    // --------------------------------------------------
    // LEAST POPULAR BLOG
    // --------------------------------------------------

    test('Least popular blog', () => {
        const result = helper.least_likes(blogs)

        // CHECK FOR OBJECT MATCH
        expect(result).toEqual({
            "id": "5a422ba71b54a676234d17fb",
            "title": "TDD harms architecture",
            "author": "Robert C. Martin",
            "url": "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            "likes": 0
        })
    })

    test('Least popular blog (incorrect)', () => {
        const result = helper.least_likes(blogs)

        // CHECK FOR OBJECT MATCH
        expect(result).not.toEqual({
            "foo": 123,
            "likes": 456
        })
    })

    test('Least popular with no entries', () => {
        const result = helper.least_likes([])
        expect(result.likes).toBe(Infinity)
    })
})