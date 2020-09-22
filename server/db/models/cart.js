const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  items: {
    type: Sequelize.STRING,
    get: function() {
      return JSON.parse(this.getDataValue('items'))
    },
    set: function(val) {
      return this.setDataValue('items', JSON.stringify(val))
    }
  }
})

module.exports = Cart
