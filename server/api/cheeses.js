const router = require('express').Router()
const {Cheese} = require('../db/models')

module.exports = router

//Security : do not show inventory and createAt
router.get('/', async (req, res, next) => {
  try {
    const cheeses = await Cheese.findAll({
      order: [['name', 'DESC']],
      attributes: ['id', 'name', 'price', 'description', 'imageUrl']
    })
    res.json(cheeses)
  } catch (err) {
    next(err)
  }
})
//Security : do not show inventory and createAt
router.get('/:cheeseId', async (req, res, next) => {
  try {
    const cheese = await Cheese.findOne({
      where: {
        id: req.params.cheeseId
      },
      attributes: ['id', 'name', 'price', 'description', 'imageUrl']
    })
    res.json(cheese)
  } catch (err) {
    next(err)
  }
})
