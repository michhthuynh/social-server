const { body } = require('express-validator')
const { changePassword, changeField } = require('../controllers/user')
const { validate } = require('../middleware/validate')

const router = require('express').Router()

router.put('/password',
  body('email').isString().isEmail(),
  body('old_password').isString().isLength({ min: 9, max: 20 }),
  body('password').isString().isLength({ min: 9, max: 20 }),
  body('pre_password').isString().isLength({ min: 9, max: 20 }),
  validate,
  changePassword
)

router.put('/:field',
  body('email').isString().isEmail(),
  body('value').isString().isLength({ min: 1 }),
  validate,
  changeField
)

module.exports = router