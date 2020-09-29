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

router.get('/history', async (req, res, next) => {
  try {
    // console.log(req.user)
    const historyCarts = await Cart.findAll({
      where: {
        userId: req.user.id,
        completed: true
      },
      order: [['updatedAt', 'DESC']],
      include: [{model: Cheese}]
    })

    res.json(historyCarts)
  } catch (err) {
    next(err)
  }
})
