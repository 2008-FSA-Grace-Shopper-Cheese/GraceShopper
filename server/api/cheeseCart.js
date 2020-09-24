const router = require('express').Router()
const {CheeseCart} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cheeseCart = await CheeseCart.findAll({})
    res.json(cheeseCart)
  } catch (err) {
    next(err)
  }
})

//   router.get('/login', async (req, res, next) => {
//     try {
//       const user = await User.findOne({
//         where: {
//           email: req.body.email
//         },
//         include: {
//           model: Cart
//         }
//       })
//       if (user) {
//         res.json(user)
//       } else {
//         res.sendStatus(400)
//       }
//     } catch (err) {
//       next(err)
//     }
//   })
