const Sequelize = require('sequelize')
const db = require('../db')

const CheeseCart = db.define('CheeseCarts', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  shippingCost: {
    type: Sequelize.INTEGER
  }
})

module.exports = CheeseCart
