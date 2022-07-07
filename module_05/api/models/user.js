const mongoose = require('mongoose')

// BLOG SCHEMA
const schema = new mongoose.Schema({
    username: {
        type: String,
        minlength: [3, 'A username must be at least 3 characters.'],
        required: [true, 'A username is required.'],
        unique: [true, 'This username already exists, and it must be unique.']
    },
    name: {
        type: String,
        minlength: [3, 'A name must be at least 3 characters.'],
    },
    password: {
        type: String,
        required: [true, 'A password is required.']
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})

// SANITIZE JSON ENTRIES
schema.set('toJSON', {
    transform: (document, entry) => {
        entry.id = entry._id
        delete entry._id
        delete entry.__v
        delete entry.password
    }
})

// CONSTRUCT MODEL FROM SCHEMA
module.exports = mongoose.model('User', schema)