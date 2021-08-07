const { body } = require('express-validator');
const {
  changePassword,
  changeField,
  changeGender,
  changeRelationship,
} = require('../controllers/UserController');
const { validate } = require('../middleware/Routing/validate');

const router = require('express').Router({ mergeParams: true });

router.put(
  '/password',
  body('old_password').isString().isLength({ min: 9, max: 20 }),
  body('password').isString().isLength({ min: 9, max: 20 }),
  body('pre_password').isString().isLength({ min: 9, max: 20 }),
  validate,
  changePassword,
);

router.put('/gender', body('value').isNumeric(), validate, changeGender);

router.put(
  '/relationship',
  body('value').isNumeric(),
  validate,
  changeRelationship,
);

router.put(
  '/:field',
  body('value').isString().isLength({ min: 1 }),
  validate,
  changeField,
);

//TODO: Add function remove User

module.exports = router;
