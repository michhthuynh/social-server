const jwt = require('jsonwebtoken')

module.exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization']
  //Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ')
    // Get token from array
    const bearerToken = bearer[1]
    if (bearerToken.trim() == "null" || bearerToken.trim() == "undefined") {
      res.sendStatus(400)
      return
    }

    jwt.verify(bearerToken, process.env.SECRET_TOKEN, (err, data) => {
      if (err) {
        res.status(403).json({
          message: '403 Forbidden'
        })
        return
      }
      res.locals.email = data.email
      next()
    })

  } else {
    // Forbidden
    res.sendStatus(403)
    return
  }
}