const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
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

module.exports = mongoose.model('Token', schema)