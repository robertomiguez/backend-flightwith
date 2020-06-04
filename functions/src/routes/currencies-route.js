var express = require('express')
var router = express.Router()
const { getCurrencies } = require('../controller/currencies-controller')

router.get('/', getCurrencies)

module.exports = router
