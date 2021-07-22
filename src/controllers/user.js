const UserModel = require("../models/User");
const bcrypt = require('bcrypt')



function checkTokenValid(email, res) {
  if (res.locals.email !== email) {
    res.status(401).json({
      msg: 'Token invalid'
    })
    return false
  }
  return true
}

module.exports.changePassword = async (req, res) => {
  const { password, pre_password, old_password, email } = req.body
  //Check token invalid
  if (!checkTokenValid(email, res)) return

  try {
    const user = await UserModel.find({ email: email });
    if (!user[0]) {
      res.status(400).json({
        message: 'Email does not register'
      });
      return;
    }

    const match = await bcrypt.compare(old_password, user[0]['password'])

    if (!match) {
      res.status(400).json({
        message: 'Wrong old password.'
      })
      return;
    }

    if (password !== pre_password) {
      res.status(400).json({
        msg: 'Password and Pre-password are not match'
      })
      return
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const result = await UserModel.updateOne({ email: email }, { password: hashPassword })

    if (result.nModified === 1) {
      res.json({
        msg: 'update password successfully'
      })
      return
    }
  } catch (error) {
    console.error(error)
    res.status(503)
  }

}

module.exports.changeField = async (req, res) => {
  const { value, email } = req.body
  const field = req.params.field
  const fieldList = ['firstName', 'lastName', 'year_of_birth', 'profilePicture', 'coverPicture', 'city', 'from']
  if (!checkTokenValid(email, res)) return
  if (!fieldList.includes(field)) {
    res.status(400).json({
      msg: 'No field is matching'
    })
    return
  }
  try {
    const user = await UserModel.find({ email: email });
    if (!user[0]) {
      res.status(400).json({
        message: 'Email does not register'
      });
      return;
    }
    const result = await UserModel.updateOne({ email: email }, { [field]: value })
    if (result.nModified === 1) {
      res.json({
        msg: `Update ${field} successfully`
      })
      return
    }
  } catch (error) {
    console.log(error)
    res.status(503)
  }
}

// TODO: changeGender function [1,2,3]
// TODO: changeRelationships function [1,2,3]
