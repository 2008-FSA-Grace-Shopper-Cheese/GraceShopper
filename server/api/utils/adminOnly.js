module.exports = (req, res, next) => {
  if (req.user && req.user.isAdmin) next()
  else {
    const error = new Error('Not Authorized!!!')
    error.status = 401
    next(error)
  }
}
