const unirest = require('unirest')
const { placesUrl, auth } = require('../config/auth')

const getPlaces = async (req, res) => {
  try {
    const endPoint =
      `${placesUrl}${req.params.country}/${req.params.currency}/${req.params.locale}/`
    const places = await unirest.get(endPoint)
      .headers(auth.headers)
      .query(`query=${req.query.query}`)
    res.status(200).json(places)
  } catch (error) {
    res.status(500).json({ error: `${error}` })
  }
}

module.exports = {
  getPlaces
}
