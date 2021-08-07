const express = require('express');
const { getToken } = require('../middleware/Auth/getToken');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const postRoutes = require('./post');
const { verifyToken } = require('../middleware/Auth/verifyToken');
const router = express.Router();

router
  .use('/auth', authRoutes)
  .use('/user/:id', getToken, verifyToken, userRoutes)
  .use('/post/:id', getToken, verifyToken, postRoutes);

module.exports = router;
