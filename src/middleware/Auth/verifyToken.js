const UserModel = require('../../models/User');

module.exports.verifyToken = async (req, res, next) => {
  try {
    const { email } = await UserModel.findById(req.params.id);
    if (res.locals.email == email) {
      next();
    } else {
      res.status(403).json({
        error: 'Token invalid',
      });
      return;
    }
  } catch (error) {
    console.log(`MongoServer failed: ${error}`);
    res.sendStatus(500);
  }
};
