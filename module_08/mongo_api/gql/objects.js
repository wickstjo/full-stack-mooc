module.exports = {
    Author: {
        bookCount: (root) => books.filter(book => book.author === root.name).length,
    }
}