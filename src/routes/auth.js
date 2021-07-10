const { body } = require('express-validator')
const { login, register } = require('../controllers/auth')
const { validate } = require('../middleware/validate')

const router = require('express').Router()

router.post('/login',
  body('email').isEmail(),
  body('password').isLength({ min: 9, max: 20 }),
  validate,
  login
)

router.post('/register',
  body('email').isEmail(),
  body('password').isLength({ min: 9, max: 20 }),
  validate,
  login
)



module.exports = router