const mongoose = require('mongoose')

// PERSON SCHEMA
const Person = mongoose.model('Person', new mongoose.Schema({
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
}))

module.exports = {
    Person
}