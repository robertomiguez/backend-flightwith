const functions = require('firebase-functions')
const app = require('./app')
exports.fwapp = functions.https.onRequest(app)
