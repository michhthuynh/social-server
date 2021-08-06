const UserModel = require("../models/User");
const bcrypt = require('bcrypt')



module.exports.changePassword = async (req, res) => {
  const { password, pre_password, old_password, email } = req.body

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

module.exports.changeGender = async (req, res) => {
  const { email, value } = req.body

  //Check gender valid
  const genderEnum = [1, 2, 3]
  if (!genderEnum.includes(value)) {
    res.status(400).json({
      msg: 'Gender param invalid'
    })
    return
  }

  try {
    const result = await UserModel.updateOne({ email: email }, { gender: value })
    if (result.nModified === 1) {
      res.json({
        msg: 'Gender field was updated successfully'
      })
      return
    }
    res.sendStatus(503)
  } catch (error) {
    console.error(`Change gender error: ${error}`)
    res.sendStatus(503)
  }
}

module.exports.changeRelationship = async (req, res) => {
  const { email, value } = req.body

  //Check relationship valid
  const relationshipEnum = [1, 2, 3]
  if (!relationshipEnum.includes(value)) {
    res.status(400).json({
      msg: 'Relationship param invalid'
    })
    return
  }

  try {
    const result = await UserModel.updateOne({ email: email }, { relationship: value })
    if (result.nModified === 1) {
      res.json({
        msg: 'Relationship was updated successfully'
      })
      return
    }
    res.sendStatus(503)
  } catch (error) {
    console.error(`Change relationship error: ${error}`)
    res.sendStatus(503)
  }
}

//TODO: remove User
module.exports.removeUser = async (req, res) => {

}