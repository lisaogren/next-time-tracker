module.exports = (req, res, next) => {
  const { authenticated, admin } = req.session

  if (authenticated && admin) {
    return next()
  }

  return res.forbidden('You are not permitted to perform this action.')
}
