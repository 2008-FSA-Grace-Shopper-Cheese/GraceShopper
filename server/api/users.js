const router = require('express').Router()
const {User, Cart} = require('../db/models')

// Gets all users with their id, email, and username
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// User signup, posts to /api/users
router.post('/', async (req, res, next) => {
  try {
    const {email, password} = req.body
    const currentUser = await User.findOne({
      where: {
        email
      }
    })
    if (currentUser) {
      return res.sendStatus(400)
    }
    const newUser = await User.create({
      email,
      password
    })
    res.json(newUser)
  } catch (err) {
    next(err)
  }
})

// Gets user info from email, including cart (remember to add attributes)
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
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

// User checkout info, changes to api/users/userId
router.put('/:userId', async (req, res, next) => {
  try {
    const {address, phoneNumber, firstName, lastName} = req.body
    const [numberofUpdated, updatedUser] = await User.update(
      {
        address,
        phoneNumber,
        firstName,
        lastName
      },
      {
        where: {
          id: req.params.userId
        },
        returning: true,
        plain: true
      }
    )
    console.log(updatedUser)
    res.json(updatedUser)
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
