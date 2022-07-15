const Book = require('../mongo/book.js')
const Author = require('../mongo/author.js')
const User = require('../mongo/user.js')

module.exports = {

    // DOCUMENT COUNTS
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),

    // BOOK QUERIES
    allBooks: async (root, args) => {

        // FILTER BY BOTH ARGS
        if (args.author && args.genre) {
            return await Book.find({
                author: await Author.findOne({
                    name: args.author
                }),
                genres: {
                    $in: [args.genre]
                }
            })
        }

        // FILTER BY AUTHOR
        if (args.author) {
            return await Book.find({
                author: await Author.findOne({
                    name: args.author
                })
            })
        }

        // FILTER BY GENRE
        if (args.genre) {
            return await Book.find({
                genre: {
                    $in: args.genre
                }
            })
        }

        // OTHERWISE, RETURN ALL BOOKS
        return await Book.find({})
    },
    findBook: async (root, args) => {
        const result = await Book.findById(args.id).populate('author', {
            name: 1,
            id: 1
        })
        return result
    },

    // AUTHOR QUERIES
    allAuthors: async () => {
        const result = await Author.find({})
        return result
    },
    findAuthor: async (root, args) => {
        const result = await Author.findById(args.id)
        return result
    },

    // USER QUERIES
    allUsers: async () => {
        const result = await User.find({})
        return result
    },
    findUser: async (root, args) => {
        const result = await User.findById(args.id)
        return result
    }
}