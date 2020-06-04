var express = require('express')
const { checkAuthAdmin } = require('../middleware/auth-middleware')

var router = express.Router()
const {
  addQueries,
  deleteQueries,
  getQueriesById,
  getQueries,
  updateQueries,
  deleteTicket
} = require('../controller/queries-controller')

router.get('/', getQueries)
router.get('/:id', getQueriesById)
router.post('/', checkAuthAdmin, addQueries)
router.patch('/:id', checkAuthAdmin, updateQueries)
router.delete('/:id', checkAuthAdmin, deleteQueries)
router.delete('/:id/ticket/:ticketId', checkAuthAdmin, deleteTicket) // delete array of maps

module.exports = router
