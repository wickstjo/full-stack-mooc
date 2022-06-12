const router = require('express').Router()
const routes = require('./routes.js')

// FETCH ENDPOINTS
router.get('/', routes.fetch_all)
router.get('/:id', routes.fetch_one)

// CREATE/REMOVE/UPDATE ENDPOINTS
router.post('/', routes.create)
router.delete('/:id', routes.remove)
router.put('/:id', routes.update)

module.exports = router