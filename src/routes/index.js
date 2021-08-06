
const express = require('express')
const { verifyToken } = require('../middleware/verifyToken')
const authRoutes = require('./auth')
const userRoutes = require('./user')
const postRoutes = require('./post')
const router = express.Router()

router
  .use('/auth', authRoutes)
  .use('/user', verifyToken, userRoutes)
  .use('/post', verifyToken, postRoutes)


module.exports = router