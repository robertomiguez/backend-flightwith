const unirest = require('unirest')
const { currenciesUrl, auth } = require('../config/auth')

const getCurrencies = async (req, res) => {
  try {
    const endPoint = `${currenciesUrl}/`
    const currencies = await unirest.get(endPoint)
      .headers(auth.headers)
    res.status(200).json(currencies)
  } catch (error) {
    res.status(500).json({ error: `${error}` })
  }
}

module.exports = {
  getCurrencies
}
