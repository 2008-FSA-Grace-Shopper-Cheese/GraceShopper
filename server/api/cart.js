const router = require('express').Router()
const {CheeseCart, Cheese, Cart} = require('../db/models')

module.exports = router

router.put('/:cartId', async (req, res, next) => {
  try {
    const [numberOfUpdated, updatedCart] = await Cart.update(
      {
        completed: true
      },
      {
        where: {
          id: req.params.cartId
        }
      }
    )

    res.json(updatedCart)
  } catch (err) {
    next(err)
  }
})
