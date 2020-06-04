var express = require('express')
var router = express.Router()
const { getPlaces } = require('../controller/places-controller')

router.get('/:country/:currency/:locale', getPlaces)

module.exports = router
