const router = require('express').Router()
const {User, Cart} = require('../db/models')

// Gets all users with their id, email, and username
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'userName']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// User signup, posts to /api/users
router.post('/', async (req, res, next) => {
  try {
    const {userName, email, password} = req.body
    const currentUser = await User.findOne({
      where: {
        userName
      }
    })
    if (currentUser) {
      return res.sendStatus(400)
    }
    const newUser = await User.create({
      userName,
      email,
      password
    })
    res.json(newUser)
  } catch (err) {
    next(err)
  }
})

// User login, gets user if userName and password matches
router.get('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      },
      include: {
        model: Cart
      }
    })
    if (user) {
      res.json(user)
    } else {
      res.sendStatus(400)
    }
  } catch (err) {
    next(err)
  }
})

// User deletion (still needs security for admin only)
router.delete('/:userId', async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.userId
      }
    })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

module.exports = router
