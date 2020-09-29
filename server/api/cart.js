const router = require('express').Router()
const {CheeseCart, Cheese, Cart} = require('../db/models')

module.exports = router

router.post('/', async (req, res, next) => {
  const cart = Cart.create({
    completed: true
  })
  console.log(cart)
  res.send(cart.id)
})

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

router.post('/guestCheckout', async (req, res, next) => {
  try {
    const {cheesecart, shippingCost} = req.body
    const cart = await Cart.create({
      completed: true
    })
    await cheesecart.map(cheese => {
      CheeseCart.create({
        cartId: cart.id,
        cheeseId: cheese.id,
        quantity: cheese.quantity,
        shippingCost
      })
    })
  } catch (err) {
    next(err)
  }
})

router.get('/history', async (req, res, next) => {
  try {
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
