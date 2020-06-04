const { admin } = require('../config/admin')

const checkAuth = async (req, res, next) => {
  if (!req.headers.authorization) return res.status(403).send('Unauthorized')
  const token = req.headers.authorization.split(' ')[1]
  try {
    await admin.auth().verifyIdToken(token)
    next()
  } catch (error) {
    res.status(403).send('Unauthorized')
  }
}

const checkAuthAdmin = async (req, res, next) => {
  if (!req.headers.authorization) return res.status(403).send('Unauthorized')
  const token = req.headers.authorization.split(' ')[1]
  try {
    const claims = await admin.auth().verifyIdToken(token)
    if (claims.admin) {
      next()
    } else {
      res.status(403).send('Unauthorized')
    }
  } catch (error) {
    res.status(403).send('Unauthorized')
  }
}

module.exports = {
  checkAuth,
  checkAuthAdmin
}
