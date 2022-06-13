const mongoose = require('mongoose')

// BLOG SCHEMA
const blog_schema = new mongoose.Schema({
    title: {
        type: String,
        minlength: [3, 'A title must be at least 3 characters.'],
        required: [true, 'A title is required.']
    },
    author: {
        type: String,
        minlength: [3, 'An author must be at least 3 characters.'],
        required: [true, 'An author is required.']
    },
    url: {
        type: String,
        minlength: [3, 'An url must be at least 3 characters.'],
        required: [true, 'An url is required.']
    },
    likes: {
        type: Number,
        default: 0
    }
})

// SANITIZE JSON ENTRIES
blog_schema.set('toJSON', {
    transform: (document, entry) => {
        entry.id = entry._id
        delete entry._id
        delete entry.__v
    }
})

// CONSTRUCT MODEL FROM SCHEMA
module.exports = mongoose.model('Blog', blog_schema)