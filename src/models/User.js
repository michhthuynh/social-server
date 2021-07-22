const mongoose = require('mongoose')

// isRequired : first, last name, email, password, gender
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  gender: {
    type: Number,
    enum: [1, 2, 3],
  },
  date_of_birth: {
    type: String
  },
  profilePicture: {
    type: String,
    default: "",
  },
  coverPicture: {
    type: String,
    default: "",
  },
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  city: {
    type: String,
    max: 50,
    default: ''
  },
  from: {
    type: String,
    max: 50,
    default: '',
  },
  relationship: {
    type: Number,
    enum: [1, 2, 3],
    default: 3
  },
},
  { timestamps: true }
)

const UserModel = mongoose.model('Users', userSchema)
module.exports = UserModel