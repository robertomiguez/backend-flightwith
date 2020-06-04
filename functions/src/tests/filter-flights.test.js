/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../app') // reference to you app.js file
const req = request(app)

describe('GET /filterflights', () => {
  test('respond with the filterflights list', async done => {
    const response = await req
      .get('/filterflights')
    expect(response.statusCode).toBe(200)
    // expect(response.body.message).toBe('pass!')
    done()
  })
})

describe('POST /filterflights', () => {
  test('respond with the filter flight created.', async done => {
    const response = await req
      .post('/filterflights')
      .set('Accept', 'application/json')
      .send(dataFilterFlights)
    expect(response).toHaveProperty('text', '{"message":"doc unique created"}')
    expect(response.statusCode).toBe(201)
    done()
  })
})

const dataFilterFlights =
{
  flights: [
    {
      active: false,
      currencySymbol: '£',
      country: 'UK',
      deal: '1000000',
      flightId: 1,
      currency: 'GBP',
      locale: 'en-UK',
      standard: '1000001',
      route: {
        originPlace: 'XXXX-sky',
        originCity: 'XXXXX',
        originCountry: 'XX',
        destinationPlace: 'YYYY-sky',
        destinationCity: 'YYYYY',
        destinationCountry: 'YY'
      }
    }
  ]
}
