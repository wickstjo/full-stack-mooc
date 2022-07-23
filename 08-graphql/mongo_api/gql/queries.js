const Book = require('../mongo/book.js')
const Author = require('../mongo/author.js')
const User = require('../mongo/user.js')

module.exports = {

    // DOCUMENT COUNTS
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    userCount: async () => await User.countDocuments(),

    // BOOK QUERIES
    books: async (root, args) => {

        // FILTER BY AUTHOR
        if (args.author) {
            return await Book.find({
                author: await Author.findOne({
                    name: args.author
                })
            }).populate('author', {
                name: 1,
                id: 1
            })
        }

        // FILTER BY GENRE
        if (args.genre) {
            return await Book.find({
                genres: {
                    $in: [args.genre]
                }
            }).populate('author', {
                name: 1,
                id: 1
            })
            
        }
        
        // OTHERWISE, RETURN ALL BOOKS
        return await Book.find({}).populate('author', {
            name: 1,
            id: 1
        })
    },
    book: async (root, args) => {
        return await Book.findById(args.id).populate('author', {
            name: 1,
            id: 1
        })
    },

    // AUTHOR QUERIES
    authors: async (root, args) => {
        return await Author.find({}).populate('books', {
            title: 1,
            published: 1,
            id: 1
        })
    },
    author: async (root, args) => {
        return await Author.findById(args.id).populate('books', {
            title: 1,
            published: 1,
            id: 1
        })
    },

    // USER QUERIES
    users: async () => {
        return await User.find({})
    },
    user: async (root, args) => {
        return await User.findById(args.id)
    }
}