const router = require('express').Router()
const {CheeseCart, Cheese, Cart} = require('../db/models')

module.exports = router

//This route is for order submit changing cart state
router.post('/', async (req, res, next) => {
  const cart = Cart.create({
    completed: true
  })
  console.log(cart)
  res.send(cart.id)
})

router.put('/:cartId', async (req, res, next) => {
  try {
    //security part :only user himself can change completed to true
    const cart = await Cart.findOne({
      where: {
        id: req.params.cartId
      }
    })
    //Not himself and not adimin throw error
    if (req.user.id != cart.userId && !req.user.isAdmin) {
      const error = new Error("You could not edit someone else's cart")
      error.status = 401
      throw error
    }

    // above is security part
    {
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
    }
  } catch (err) {
    next(err)
  }
})

//This route is for user seeing his purchase history
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
