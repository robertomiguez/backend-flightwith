const admin = require('firebase-admin')
const serviceAccount = require('./firebaseKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://flightwith-80e39.firebaseio.com'
})

const db = admin.firestore()

module.exports = {
  db,
  admin
}
