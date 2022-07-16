const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    born: {
        type: Number,
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
})

// SANITIZE JSON ENTRIES
schema.set('toJSON', {
    transform: (document, entry) => {
        entry.id = entry._id
        delete entry._id
        delete entry.__v
    }
})

module.exports = mongoose.model('Author', schema)