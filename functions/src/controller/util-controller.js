/**
 * Util-Controller
 * description: order objects attributes
 */

const getTickets = (docDataTickets) => {
  const arrayTickets = []
  docDataTickets.forEach((ticket) => {
    arrayTickets.push({
      quoteId: ticket.quoteId,
      quoteDateTime: ticket.quoteDateTime,
      minPrice: ticket.minPrice,
      direct: ticket.direct,
      outboundLeg: {
        carrierName: ticket.outboundLeg.carrierName,
        departureDate: ticket.outboundLeg.departureDate,
        placeName: ticket.outboundLeg.placeName,
        iataCode: ticket.outboundLeg.iataCode
      },
      inboundLeg: {
        carrierName: ticket.inboundLeg.carrierName,
        departureDate: ticket.inboundLeg.departureDate,
        placeName: ticket.inboundLeg.placeName,
        iataCode: ticket.inboundLeg.iataCode
      }
    })
  })
  return arrayTickets
}

module.exports = {
  getTickets
}
