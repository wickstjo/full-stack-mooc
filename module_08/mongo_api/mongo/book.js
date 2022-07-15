const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 2
    },
    published: {
        type: Number,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    genres: [{
        type: String
    }]
})

// SANITIZE JSON ENTRIES
schema.set('toJSON', {
    transform: (document, entry) => {
        entry.id = entry._id
        delete entry._id
        delete entry.__v
    }
})

module.exports = mongoose.model('Book', schema)