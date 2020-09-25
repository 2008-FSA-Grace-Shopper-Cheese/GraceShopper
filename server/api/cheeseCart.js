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
          // as: cheeseId
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

router.delete('/:id', async (req, res, next) => {
  try {
    await CheeseCart.destroy({
      where: {
        cheeseId: req.body.cheeseId
      }
    })
  } catch (error) {
    next(error)
  }
})
