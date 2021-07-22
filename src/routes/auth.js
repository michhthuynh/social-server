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
  body('firstName').isString().isLength({ min: 5, max: 50 }),
  body('firstName').isString().isLength({ min: 5, max: 50 }),
  body('email').isString().isEmail(),
  body('password').isString().isLength({ min: 9, max: 20 }),
  validate,
  register
)



module.exports = router