const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getCurrentUser } = require('../controllers/users');
const { userIdValidation } = require('../middlewares/validation');

router.get('/users/me', celebrate(userIdValidation), getCurrentUser);

module.exports = router;