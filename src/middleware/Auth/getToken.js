const jwt = require('jsonwebtoken');

module.exports.getToken = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  //Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    if (bearerToken.trim() == 'null' || bearerToken.trim() == 'undefined') {
      res.sendStatus(400);
      return;
    }
    try {
      const { email } = await jwt.verify(bearerToken, process.env.SECRET_TOKEN);
      res.locals.email = email;
      next();
    } catch (error) {
      res.status(403).json({
        message: 'Token Invalid',
      });
    }
  } else {
    // Forbidden
    res.sendStatus(403);
    return;
  }
};
