const { admin } = require('../config/admin')

const GrantAdmin = async (req, res) => {
  try {
    const email = req.params.email
    const user = await admin.auth().getUserByEmail(email)
    if (user.customClaims && user.customClaims.admin) {
      res.status(200).json({ message: `Email ${email} already has administrator privileges.` })
    } else {
      admin.auth().setCustomUserClaims(user.uid, { admin: true })
      res.status(200).json({ message: `Email ${email} was granted administrator privileges.` })
    }
  } catch (error) {
    switch (error.code) {
      case 'auth/user-not-found':
        res.status(200).json({ message: 'email not found.' })
        break
      default:
        res.status(500).json({ error: `${error}` })
    }
  }
}

const RevokeAdmin = async (req, res) => {
  try {
    const email = req.params.email
    const user = await admin.auth().getUserByEmail(email)
    if (user.customClaims && user.customClaims.admin) {
      admin.auth().setCustomUserClaims(user.uid, { admin: false })
      res.status(200).json({ message: `Email ${email} was revoked administrator privileges.` })
    } else {
      res.status(200).json({ message: `Email ${email} has not administrator privileges.` })
    }
  } catch (error) {
    switch (error.code) {
      case 'auth/user-not-found':
        res.status(200).json({ message: 'email not found.' })
        break
      default:
        res.status(500).json({ error: `${error}` })
    }
  }
}

module.exports = {
  GrantAdmin,
  RevokeAdmin
}
