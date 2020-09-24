const Sequelize = require('sequelize')
const db = require('../db')

const CheeseCart = db.define('CheeseCarts', {
  quantity: {
    type: Sequelize.INTEGER
  },
  purchasePrice: {
    type: Sequelize.INTEGER
  },
  shippingTime: {
    type: Sequelize.STRING
  }
})

module.exports = CheeseCart
