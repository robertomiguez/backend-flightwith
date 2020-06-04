const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const queriesRoute = require('./src/routes/queries-route')
const filterFlightsRoute = require('./src/routes/filter-flights-route')
const placesRoute = require('./src/routes/places-route')
const currenciesRoute = require('./src/routes/currencies-route')
const loginRoute = require('./src/routes/login-route')
const { checkAuthAdmin } = require('./src/middleware/auth-middleware')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? [
      'https://flightwith-80e39.web.app',
      'https://flightwith-80e39.firebaseapp.com'
    ]
    : 'http://localhost:8080',
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
  methods: ['GET', 'PATCH', 'DELETE']
}

app.use(cors(corsOptions))
// app.use(cors({ origin: true }))

app.use('/queries', queriesRoute)
app.use('/filterflights', checkAuthAdmin, filterFlightsRoute)
app.use('/places', placesRoute)
app.use('/currencies', currenciesRoute)
app.use('/login', loginRoute)

app.route('*')
  .get((req, res) => {
    res.status(404).json({ error: 'Sorry, url not found.' })
  })
  .delete((req, res) => {
    res.status(404).json({ error: 'Sorry, url not found.' })
  })
  .put((req, res) => {
    res.status(404).json({ error: 'Sorry, url not found.' })
  })

module.exports = app
