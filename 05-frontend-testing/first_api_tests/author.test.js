const helper = require('./misc/helpers')
const blogs = require('./misc/blogs.json')

describe('Blog author tests', () => {

    // --------------------------------------------------
    // AUTHOR OCURRENCE
    // --------------------------------------------------

    test('Most frequently occurring author', () => {
        const result = helper.most_frequent_author(blogs)

        // COMPARE OBJECTS
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })

    test('Most frequently occurring author (incorrect)', () => {
        const result = helper.most_frequent_author(blogs)

        // COMPARE OBJECTS
        expect(result).not.toEqual({
            author: "foo",
            blogs: 123
        })
    })

    // --------------------------------------------------
    // AUTHOR LIKES
    // --------------------------------------------------

    test('Most liked author', () => {
        const result = helper.most_liked_author(blogs)

        // COMPARE OBJECTS
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })

    test('Most liked author (incorrect)', () => {
        const result = helper.most_liked_author(blogs)

        // COMPARE OBJECTS
        expect(result).not.toEqual({
            author: "foo",
            likes: 123
        })
    })
})