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
    const cheeseCart = await Cart.findAll({
      where: {
        userId: req.params.id
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

router.get('/:id/:cheeseId', async (req, res, next) => {
  try {
    const cheeseCart = await Cart.findOne({
      where: {
        userId: req.params.id
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

router.put('/quantity/:id', async (req, res, next) => {
  try {
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

router.put('/:id', async (req, res, next) => {
  try {
    await CheeseCart.update(
      {
        quantity: req.body.qty
      },
      {
        where: {
          cartId: req.params.id,
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

router.post('/:id/:cheeseId', async (req, res, next) => {
  console.log(req.params.cheeseId)
  try {
    const arr = await Cart.findOrCreate({
      where: {completed: 'false', userId: req.params.id}
    })
    const cart = arr[0] // the first element is the instance
    const wasCreated = arr[1] // the second element tells us if the

    const cheese = await Cheese.findByPk(req.params.cheeseId)

    await cheese.addCart(cart)
    console.log('******', wasCreated)

    let qty
    console.log('1111', cart.id)
    console.log('2222', req.params.cheeseId)
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

router.delete('/:id/:cheeseId', async (req, res, next) => {
  try {
    await CheeseCart.destroy({
      where: {
        cartId: req.params.id,
        cheeseId: req.params.cheeseId
      }
    })
    res.json('deleted')
  } catch (error) {
    next(error)
  }
})
