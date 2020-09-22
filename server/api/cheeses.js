const router = require('express').Router()
const {User, Cheese} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cheeses = await Cheese.findAll({})
    res.json(cheeses)
  } catch (err) {
    next(err)
  }
})
