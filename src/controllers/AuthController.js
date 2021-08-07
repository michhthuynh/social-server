const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.find({ email: email });
  if (!user[0]) {
    res.status(400).json({
      message: 'Email does not register',
    });
    return;
  }

  const match = await bcrypt.compare(password, user[0]['password']);

  if (!match) {
    res.status(401).json({
      message: 'Wrong password.',
    });
    return;
  }

  // register token
  console.log('Verify account successfully');
  jwt.sign(
    { email },
    process.env.SECRET_TOKEN,
    { expiresIn: '24h' },
    (err, token) => {
      if (err) {
        console.log(err.message);
        res.sendStatus(503);
        return;
      }
      res.status(200).json({
        id: user[0]._id,
        token,
      });
      return;
    },
  );
};

module.exports.register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    gender,
    age,
    profilePicture,
    coverPicture,
    city,
    from,
    relationship,
  } = req.body;

  // check firstName and lastName is valid
  const pattern = /^([^0-9]*)$/;
  if (!pattern.test(firstName)) {
    res.status(400).json({
      msg: "First name shouldn't have number",
    });
    return;
  }

  if (!pattern.test(lastName)) {
    res.status(400).json({
      msg: "Last name shouldn't have number",
    });
    return;
  }

  // Check gender is enum
  const genderEnum = [1, 2, 3];
  if (!genderEnum.includes(gender)) {
    res.status(400).json({
      msg: 'Gender invalid',
    });
    return;
  }

  try {
    const hasEmail = await UserModel.find({ email: email });
    if (hasEmail.length !== 0) {
      res.status(400).json({
        msg: 'Email is exist. Please use another email',
      });
      return;
    }
  } catch (error) {
    console.log('Cannot connect to database:');
    console.log(error);
    res.sendStatus(503);
    return;
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      age: age || null,
      gender: gender,
      profilePicture,
      coverPicture,
      city,
      from,
      relationship: relationship || 3,
    });
    if (user) {
      console.log(`Created database: ${user.id}`);
      res.status(201).json({
        id: user.id,
        firstName,
        lastName,
        email: email,
        age: age || null,
        gender: gender,
        profilePicture,
        coverPicture,
        city,
        from,
      });
    } else {
      console.log(`Cannot create account: ${email}`);
      res.sendStatus(400);
      return;
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(503);
    return;
  }
};
