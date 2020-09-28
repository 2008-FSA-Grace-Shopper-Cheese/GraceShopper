const router = require('express').Router()
const {Cheese} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cheeses = await Cheese.findAll({
      order: [['name', 'DESC']]
    })
    res.json(cheeses)
  } catch (err) {
    next(err)
  }
})

router.get('/:cheeseId', async (req, res, next) => {
  try {
    const cheese = await Cheese.findByPk(req.params.cheeseId)
    res.json(cheese)
  } catch (err) {
    next(err)
  }
})
