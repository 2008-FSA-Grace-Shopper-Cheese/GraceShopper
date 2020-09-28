/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Cheese = db.model('cheese')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        password: 'newpassword'
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

describe('Cheese routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/cheese', () => {
    const cheese1 = 'Burrata'

    beforeEach(() => {
      return Cheese.create({
        name: cheese1,
        price: 1599,
        description:
          'an Italian cow milk cheese made from mozzarella and cream.',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Burrata2.jpg/1200px-Burrata2.jpg'
      })
    })

    xit('GET /api/cheese', async () => {
      const res = await request(app)
        .get('/api/cheese')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(cheese1)
    })
  })
})
