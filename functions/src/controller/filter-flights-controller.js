const { db, admin } = require('../config/admin')

const getFilterFlights = async (req, res) => {
  try {
    const collection = await db.collection('filterflights').get()
    const docs = []
    collection.forEach((doc) => {
      docs.push({
        id: doc.id,
        data: doc.data()
      })
    })
    res.status(200).json(docs)
  } catch (error) {
    res.status(500).json({ error: `${error}` })
  }
}

const addFilterFlights = async (req, res) => {
  try {
    await db.collection('filterflights')
      .doc('unique')
      .update({
        flights: admin.firestore.FieldValue.arrayUnion(req.body)
      })
    res.status(200).json({ message: `Flight ${req.body.flightId} added.` })
  } catch (error) {
    res.status(500).json({ error: `${error}` })
  }
}

const activeFilterFlights = async (req, res) => {
  try {
    const uniqueRef = db.collection('filterflights').doc('unique')

    await uniqueRef.update({
      flights: admin.firestore.FieldValue.arrayRemove(req.body)
    })
    req.body.active = !req.body.active
    await uniqueRef.update({
      flights: admin.firestore.FieldValue.arrayUnion(req.body)
    })

    res.status(200).json({ message: `Flight ${req.body.flightId} updated.` })
  } catch (error) {
    res.status(500).json({ error: `${error}` })
  }
}

const deleteFilterFlights = async (req, res) => {
  try {
    await db.collection('filterflights')
      .doc('unique')
      .update({
        flights: admin.firestore.FieldValue.arrayRemove(req.body)
      })
    res.status(200).json({ message: `Flight ${req.body.flightId} deleted.` })
  } catch (error) {
    res.status(500).json({ error: `${error}` })
  }
}

module.exports = {
  getFilterFlights,
  addFilterFlights,
  deleteFilterFlights,
  activeFilterFlights
}
