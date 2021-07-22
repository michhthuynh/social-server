
const express = require('express')
const { verifyToken } = require('../middleware/verifyToken')
const authRoutes = require('./auth')
const userRoutes = require('./user')
const router = express.Router()

router
  .use('/auth', authRoutes)
  .use('/user', verifyToken, userRoutes)


module.exports = router