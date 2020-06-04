/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../app') // reference to you app.js file
const req = request(app)

describe('POST /queries', () => {
  test('respond with the query created.', async done => {
    const response = await req
      .post('/queries')
      .set('Accept', 'application/json')
      .send(dataQueries)
    expect(response).toHaveProperty('text', '{"message":"Query PPPP-LLLL created"}')
    expect(response.statusCode).toBe(201)
    done()
  })
})

describe('PUT /queries/PPPP-LLLL', () => {
  test('respond with the query updated.', async done => {
    const response = await req
      .put('/queries/PPPP-LLLL')
      .set('Accept', 'application/json')
      .send(dataQueries)
    expect(response).toHaveProperty('text', '{"message":"Query PPPP-LLLL updated"}')
    expect(response.statusCode).toBe(200)
    done()
  })
})

describe('GET /queries', () => {
  test('respond with the query list', async done => {
    const response = await req
      .get('/queries')
    expect(response.statusCode).toBe(200)
    // expect(response.body.message).toBe('pass!')
    done()
  })
})

describe('GET /queries/:id', () => {
  it('respond status 404 with a query not found', async done => {
    const response = await req
      .get('/queries/wrongid')
    expect(response.status).toBe(404)
    // expect(response.body.message).toBe('pass!')
    done()
  })
  it('respond status 200 with a query found', async done => {
    const response = await req
      .get('/queries/PPPP-LLLL')
    expect(response.status).toBe(200)
    // expect(response.body.message).toBe('pass!')
    done()
  })
})

describe('DELETE /queries/:id', () => {
  it('respond status 200 with the query deleted ', async done => {
    const response = await req
      .delete('/queries/PPPP-LLLL')
    expect(response.status).toBe(200)
    // expect(response.body.message).toBe('pass!')
    done()
  })
})

const dataQueries =
{
  active: true,
  country: 'UK',
  locale: 'en-UK',
  currency: 'GBP',
  currencySymbol: '$',
  deal: 650,
  standard: 500,
  route: {
    originplace: 'PPPP-',
    origincity: 'Glasgow',
    origincountry: 'United Kingdom',
    destinationplace: 'LLLL-',
    destinationcity: 'Osaka',
    destinationcountry: 'Japan'
  },
  tickets: [
    {
      quoteId: 33,
      quoteDateTime: '2020-04-01T16:08:00',
      direct: false,
      minPrice: 500,
      outboundLeg: {
        carriername: 'TAP',
        departureDate: '2020-02-12T00:00:00',
        iataCode: 'GLA',
        placeName: 'Glasgow Internacional'
      },
      inboundLeg: {
        carriername: 'TAP',
        departureDate: '2020-03-12T00:00:00',
        iataCode: 'GIG',
        placeName: 'Rio De Janeiro Internacional'
      }
    }
  ]
}
