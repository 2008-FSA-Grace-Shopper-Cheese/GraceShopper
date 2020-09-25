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
        returning: true, // needed for affectedRows to be populated
        plain: true // makes sure that the returned instances are just plain objects
      }
    )
    res.json('OK')
  } catch (error) {
    next(error)
  }
})

router.delete('/:id/:cheeseId', async (req, res, next) => {
  try {
    //   console.log('req.body.cheeseId  backend',req.params.id,req.params.cheeseId)
    await CheeseCart.destroy({
      where: {
        cartId: req.params.id,
        cheeseId: req.params.cheeseId
      }
    })
  } catch (error) {
    next(error)
  }
})
