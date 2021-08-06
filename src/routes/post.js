const { body } = require('express-validator')
const { checkTokenValid } = require('../middleware/checkTokenValid')
const { validate } = require('../middleware/validate')

const router = require('express').Router()

// create post
router.post('/',
  body('email').isString().isEmail(),
  body('description').isString().isLength({ min: 1 }),
  validate,
  checkTokenValid,

)
// change content
// change reaction
// add images

module.exports = router