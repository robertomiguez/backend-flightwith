const { db, admin } = require('../config/admin')
const { getTickets } = require('./util-controller')

const addQueries = async (req, res) => {
  try {
    const id = `${req.body.route.originplace.split('-')[0]}-${req.body.route.destinationplace.split('-')[0]}`
    await db.collection('queries').doc(id).set(req.body)
    res.status(201).json({ message: `Query ${id} created` })
  } catch (error) {
    res.status(500).json({ error: `${error}` })
  }
}

const getQueriesById = async (req, res) => {
  try {
    const doc = await db.collection('queries').doc(req.params.id).get()
    if (doc.exists) {
      // return doc.data()
      res.status(200).json({
        id: doc.id,
        data: {
          active: doc.data().active,
          country: doc.data().country,
          locale: doc.data().locale,
          currency: doc.data().currency,
          currencySymbol: doc.data().currencySymbol,
          deal: doc.data().deal,
          standard: doc.data().standard,
          route: {
            // originPlace: doc.data().route.originPlace,
            originCity: doc.data().route.originCity,
            originCountry: doc.data().route.originCountry,
            // destinationPlace: doc.data().route.destinationPlace,
            destinationCity: doc.data().route.destinationCity,
            destinationCountry: doc.data().route.destinationCountry
          },
          tickets: getTickets(doc.data().tickets)
        }
      })
    } else {
      res.status(404).json({ message: 'Query not found' })
    }
  } catch (error) {
    res.status(500).json({ error: `${error}` })
  }
}

const getQueries = async (req, res) => {
  try {
    const collection =
      req.query.active === 'true'
        ? await db.collection('queries').where('active', '==', true).get()
        : await db.collection('queries').get()
    const docs = []
    collection.forEach((doc) => {
      // docs.push({
      //   id: doc.id,
      //   // tickets: doc.data().tickets
      //   data: doc.data()
      // })
      docs.push({
        id: doc.id,
        data: {
          active: doc.data().active,
          country: doc.data().country,
          locale: doc.data().locale,
          currency: doc.data().currency,
          currencySymbol: doc.data().currencySymbol,
          deal: doc.data().deal,
          standard: doc.data().standard,
          route: {
            // originPlace: doc.data().route.originPlace,
            originCity: doc.data().route.originCity,
            originCountry: doc.data().route.originCountry,
            // destinationPlace: doc.data().route.destinationPlace,
            destinationCity: doc.data().route.destinationCity,
            destinationCountry: doc.data().route.destinationCountry
          },
          tickets: getTickets(doc.data().tickets)
        }
      })
    })
    res.status(200).json(docs)
  } catch (error) {
    res.status(500).json({ error: `${error}` })
  }
}

const updateQueries = async (req, res) => {
  try {
    const id = req.params.id
    await db.collection('queries').doc(id).set(req.body, { merge: true })
    res.status(200).json({ message: `Query ${id} updated` })
  } catch (error) {
    res.status(500).json({ error: `${error}` })
  }
}

const deleteQueries = async (req, res) => {
  try {
    await db.collection('queries')
      .doc(req.params.id)
      .delete()
    res.status(200).json({ message: `Query ${req.params.id} deleted` })
  } catch (error) {
    res.status(500).json({ error: `${error}` })
  }
}

const deleteTicket = async (req, res) => {
  try {
    await db.collection('queries')
      .doc(req.params.id)
      .update({
        tickets: admin.firestore.FieldValue.arrayRemove(req.body)
      })
    res.status(200).json({ message: `Ticket ${req.params.ticketId} deleted` })
  } catch (error) {
    res.status(500).json({ error: `${error}` })
  }
}

module.exports = {
  addQueries,
  deleteQueries,
  getQueriesById,
  getQueries,
  updateQueries,
  deleteTicket
}
