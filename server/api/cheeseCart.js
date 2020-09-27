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

router.post('/:cartId/:cheeseId', async (req, res, next) => {
  console.log(req.params.cheeseId)
  try {
    const cart = await Cart.findByPk(req.params.cartId)

    const cheese = await Cheese.findByPk(req.params.cheeseId)

    await cheese.addCart(cart)

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
