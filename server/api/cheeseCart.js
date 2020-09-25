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

// This api gets us all cheeses that belongs to a cart by cartId
router.get('/:cartId', async (req, res, next) => {
  try {
    console.log('cartId', req.params.cartId)
    const cheeseCart = await CheeseCart.findAll({
      where: {
        cartId: req.params.cartId
      }
      // include: {
      //   model: Cheese,
      //   // as: cheeseId
      // }
    })
    res.json(cheeseCart)
  } catch (error) {
    next(error)
  }
})
