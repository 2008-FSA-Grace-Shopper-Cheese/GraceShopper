const router = require('express').Router()
const {CheeseCart, Cheese, Cart} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cheeseCart = await CheeseCart.findAll({})
    res.json(cheeseCart)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    console.log(req.params.id)
    const cheeseCart = await CheeseCart.findAll({
      where: {
        cartId: req.params.id
      },
      include: {
        model: Cheese,
        as: cheeseId
      }
    })
    res.json(cheeseCart)
  } catch (error) {
    next(error)
  }
})
