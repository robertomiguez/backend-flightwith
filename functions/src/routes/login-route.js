var express = require('express')
var router = express.Router()
const { GrantAdmin, RevokeAdmin } = require('../controller/login-controller')
// import {checkIfAuthenticated} from './src/middlewares/auth-middleware'
const { checkAuthAdmin } = require('../middleware/auth-middleware')

router.patch('/grant/admin/:email', checkAuthAdmin, GrantAdmin)
router.patch('/revoke/admin/:email', checkAuthAdmin, RevokeAdmin)

module.exports = router
