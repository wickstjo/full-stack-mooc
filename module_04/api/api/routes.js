const Blog = require('../models/blog.js')

// WRAPPER FOR QUERY FUNCS
const wrapper = async (query, next, success) => {
    try {
        const response = await query
        success(response)

    } catch (error) {
        next(error)
    }
}

// FETCH ALL ENTRIES
const fetch_all = (request, response, next) => {

    // BLUEPRINT QUERY
    const query = Blog.find({})

    // PROCESS IT
    wrapper(query, next, result => {
        response.status(200).send(result)
    })
}

// FETCH ONE ENTRY BY ID
const fetch_one = (request, response, next) => {

    // BLUEPRINT QUERY
    const query = Blog.findById(request.params.id)

    // PROCESS IT
    wrapper(query, next, entry => {
        
        // PERSON FOUND
        if (entry) {
            response.status(200).send(entry)

        // OTHERWISE, 404
        } else {
            response.status(404).send({
                errors: ['ID does not exist.']
            })
        }
    })
}

// CREATE ENTRY
const create = (request, response, next) => {
    
    // BLUEPRINT QUERY
    const query = new Blog(request.body).save()

    // PROCESS IT
    wrapper(query, next, entry => {
        response.status(201).json(entry)
    })
}

// REMOVE ENTRY
const remove = (request, response, next) => {

    // BLUEPRINT QUERY
    const query = Blog.deleteOne({
        _id: request.params.id
    })

    // PROCESS IT
    wrapper(query, next, result => {
        
        // SOMETHING WAS ACTUALLY DELETED
        if (result.deletedCount > 0) {
            response.status(204).end()
        
        // OTHERWISE, SEND ERROR
        } else {
            response.status(404).send({
                errors: ['ID does not exist.']
            })
        }
    })
}

// UPDATE ENTRY
const update = (request, response, next) => {

    // BLUEPRINT QUERY
    const query = Blog.updateOne({
        _id: request.params.id
    }, request.body)

    // PROCESS IT
    wrapper(query, next, result => {

        // ENTRY FOUND & MODIFIED
        if (result.modifiedCount === 1) {
            response.status(200).end()

        // OTHERWISE, THROW ERROR
        } else {
            response.status(400).send({
                errors: ['ID does not exist.']
            })
        }
    })
}

module.exports = {
    fetch_all,
    fetch_one,
    create,
    remove,
    update
}