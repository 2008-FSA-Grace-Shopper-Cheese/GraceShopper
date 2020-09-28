/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Cheese = db.model('cheese')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones',
          address: '123 Seasame Street'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    })
    describe('correctAddress', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones',
          address: '123 Seasame Street'
        })
      })

      it('returns true if the address is correct', () => {
        expect(cody.address === '123 Seasame Street').to.be.equal(true)
      })

      it('returns false if the address is incorrect', () => {
        expect(cody.address === '124 Seasame Street').to.be.equal(false)
      })
    })
  })
})

describe('Cheese model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('Testing Cheese model', () => {
    describe('cheese name', () => {
      let cheese

      beforeEach(async () => {
        cheese = await Cheese.create({
          name: 'Burrata',
          price: 1599,
          description:
            'an Italian cow milk cheese made from mozzarella and cream.',
          imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Burrata2.jpg/1200px-Burrata2.jpg'
        })
      })

      it('returns true cheese name is Burrata', () => {
        expect(cheese.name === 'Burrata').to.be.equal(true)
      })

      it('returns false if the cheese name is not Burrata', () => {
        expect(cheese.name === 'Burrati').to.be.equal(false)
      })
    })
    describe('cheese price', () => {
      let cheese

      beforeEach(async () => {
        cheese = await Cheese.create({
          name: 'Burrata',
          price: 1599,
          description:
            'an Italian cow milk cheese made from mozzarella and cream.',
          imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Burrata2.jpg/1200px-Burrata2.jpg'
        })
      })

      it('returns true cheese price is correct', () => {
        expect(cheese.price === 1599).to.be.equal(true)
      })

      it('returns false if the cheese price is not correct', () => {
        expect(cheese.price === 1600).to.be.equal(false)
      })
    })
  })
})
