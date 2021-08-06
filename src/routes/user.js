const { body } = require('express-validator')
const { changePassword, changeField, changeGender, changeRelationship } = require('../controllers/user')
const { checkTokenValid } = require('../middleware/checkTokenValid')
const { validate } = require('../middleware/validate')

const router = require('express').Router()

router.put('/password',
  body('email').isString().isEmail(),
  body('old_password').isString().isLength({ min: 9, max: 20 }),
  body('password').isString().isLength({ min: 9, max: 20 }),
  body('pre_password').isString().isLength({ min: 9, max: 20 }),
  validate,
  checkTokenValid,
  changePassword
)

router.put('/gender',
  body('email').isString().isEmail(),
  body('value').isNumeric(),
  validate,
  checkTokenValid,
  changeGender
)

router.put('/relationship',
  body('email').isString().isEmail(),
  body('value').isNumeric(),
  validate,
  checkTokenValid,
  changeRelationship
)

router.put('/:field',
  body('email').isString().isEmail(),
  body('value').isString().isLength({ min: 1 }),
  validate,
  checkTokenValid,
  changeField
)

//TODO: Add function remove User


module.exports = router