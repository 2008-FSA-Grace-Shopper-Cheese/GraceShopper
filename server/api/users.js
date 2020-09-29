const router = require('express').Router()
const {User, Cart} = require('../db/models')
const adminOnly = require('./utils/adminOnly')
// Gets all users with their id, email, and username
//Securtity: only admin can get all user info
router.get('/', adminOnly, async (req, res, next) => {
  try {
    //Securtity part
    // if (!req.user.isAdmin) {
    //   const error = new Error("Only admin can see all users")
    //   error.status = 401
    //   throw error
    // }
    // above is security part

    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// User signup, posts to /api/users
//No security needed, any one can create a new user
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
        //securtity: only see himself's user info
        //id: req.params.userId,
        id: req.user.id
      },
      attributes: ['firstName', 'lastName', 'email'],
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
          //security: only change himself's user info
          //  id: req.params.userId,
          id: req.user.id
        },
        returning: true,
        plain: true
      }
    )
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})

// User deletion (still needs security for admin only)
//Security: only admin can delete
router.delete('/:userId', adminOnly, async (req, res, next) => {
  try {
    // if (!req.user.isAdmin) {
    //   const error = new Error("Only admin can delete user")
    //   error.status = 401
    //   throw error
    // }

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
