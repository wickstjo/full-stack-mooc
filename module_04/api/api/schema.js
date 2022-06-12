const mongoose = require('mongoose')

// PERSON SCHEMA
const person_schema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [3, 'A name must be at least 3 characters.'],
        required: [true, 'A name is required.']
    },
    number: {
        type: String,
        minlength: [8, 'A phone number is at least 8 characters.'],
        match: [/^\d{2,3}-(\d+)$/, 'Phone number does not match a valid pattern.'],
        required: [true, 'A valid phone number is required.']
    },
})

// SANITIZE JSON ENTRIES
person_schema.set('toJSON', {
    transform: (document, entry) => {
        entry.id = entry._id
        delete entry._id
        delete entry.__v
    }
})

// CONSTRUCT MODEL FROM SCHEMA
module.exports = mongoose.model('Person', person_schema)