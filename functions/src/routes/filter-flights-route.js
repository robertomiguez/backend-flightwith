var express = require('express')
var router = express.Router()
const { getFilterFlights, addFilterFlights, deleteFilterFlights, activeFilterFlights } = require('../controller/filter-flights-controller')

router.get('/', getFilterFlights)
router.post('/', addFilterFlights)
router.delete('/', deleteFilterFlights)
router.patch('/active/', activeFilterFlights)

module.exports = router
