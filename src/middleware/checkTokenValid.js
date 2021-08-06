module.exports.checkTokenValid = (req, res, next) => {
  if (res.locals.email !== req.body.email) {
    res.status(401).json({
      msg: 'Token invalid'
    })
    return
  }
  next()
}