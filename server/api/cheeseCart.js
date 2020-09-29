const router = require('express').Router()
const {CheeseCart, Cheese, Cart} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cheeseCart = await CheeseCart.findAll({
      order: [['name', 'DESC']]
    })
    res.json(cheeseCart)
  } catch (err) {
    next(err)
  }
})

router.get('/userCart', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(500)
    }
    const cheeseCart = await Cart.findAll({
      where: {
        userId: req.user.id,
        completed: false
      },
      include: [
        {
          model: Cheese
        }
      ]
    })
    res.json(cheeseCart)
  } catch (error) {
    next(error)
  }
})

router.get('/:cheeseId', async (req, res, next) => {
  try {
    const cheeseCart = await Cart.findOne({
      where: {
        userId: req.user.id,
        completed: false
      },
      include: [
        {
          model: Cheese,
          where: {
            id: req.params.cheeseId
          }
        }
      ]
    })
    res.json(cheeseCart)
  } catch (error) {
    next(error)
  }
})
// this id is CartId
router.put('/quantity/:id', async (req, res, next) => {
  try {
    // const cart = await Cart.findOne({
    //   where: {completed: 'false', userId: req.params.id},
    // })

    // const cartId = cart.id

    await CheeseCart.update(
      {
        shippingCost: req.body.shippingCost
      },
      {
        where: {
          cartId: req.params.id
        }
      }
    )
    res.json('OK')
  } catch (error) {
    next(error)
  }
})

router.put('/changeQuantity', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {completed: 'false', userId: req.user.id}
    })

    const cartId = cart.id

    await CheeseCart.update(
      {
        quantity: req.body.qty
      },
      {
        where: {
          cartId: cartId,
          cheeseId: req.body.cheeseId
        },
        returning: true,
        plain: true
      }
    )
    res.json('OK')
  } catch (error) {
    next(error)
  }
})

router.post('/:cheeseId', async (req, res, next) => {
  try {
    const arr = await Cart.findOrCreate({
      where: {completed: 'false', userId: req.user.id}
    })
    const cart = arr[0] // the first element is the instance
    const wasCreated = arr[1] // the second element tells us if the

    const cheese = await Cheese.findByPk(req.params.cheeseId)

    await cheese.addCart(cart)

    let qty
    const cheeseCartInstance = await CheeseCart.findOne({
      where: {
        cartId: cart.id,
        cheeseId: req.params.cheeseId
      }
    })
    console.log(cheeseCartInstance.quantity)
    qty = cheeseCartInstance.quantity

    await CheeseCart.update(
      {
        quantity: ++qty
      },
      {
        where: {
          cartId: cart.id,
          cheeseId: req.params.cheeseId
        }
      }
    )

    res.json('OK')
  } catch (error) {
    next(error)
  }
})

router.delete('/:cheeseId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {completed: 'false', userId: req.user.id}
    })

    const cartId = cart.id
    await CheeseCart.destroy({
      where: {
        cartId: cartId,
        cheeseId: req.params.cheeseId
      }
    })
    res.json('deleted')
  } catch (error) {
    next(error)
  }
})
