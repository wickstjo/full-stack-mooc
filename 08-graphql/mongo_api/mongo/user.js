const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 2
    },
    password: {
        type: String,
        required: true,
        minlength: 2
    },
    favoriteGenre: {
        type: String,
        required: true,
        minlength: 2
    }
})

// SANITIZE JSON ENTRIES
schema.set('toJSON', {
    transform: (document, entry) => {
        entry.id = entry._id
        delete entry._id
        delete entry.__v
    }
})

module.exports = mongoose.model('User', schema)