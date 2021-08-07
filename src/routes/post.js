const { body } = require('express-validator');
const { validate } = require('../middleware/routing/validate');

const router = require('express').Router();

// create post
router.post('/', body('description').isString().isLength({ min: 1 }), validate);
// change content
// change reaction
// add images

module.exports = router;
