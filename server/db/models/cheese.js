const Sequelize = require('sequelize')
const db = require('../db')

const Cheese = db.define('cheese', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
    //ADD MIN SO PPL DONT BANKRUPT US
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'https://images.heb.com/is/image/HEBGrocery/001199858'
  }
  //inventory
})

module.exports = Cheese
