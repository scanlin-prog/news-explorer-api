const router = require('express').Router();
const { celebrate } = require('celebrate');
const { createUser, loginUser } = require('../controllers/users');
const { registerValidation, loginValidation } = require('../middlewares/validation');
const userRoutes = require('./users');
const articleRoutes = require('./articles');
const auth = require('../middlewares/auth');

router.post('/signup', celebrate(registerValidation), createUser);
router.post('/signin', celebrate(loginValidation), loginUser);

router.use(auth);

router.use('/', userRoutes);
router.use('/', articleRoutes);

module.exports = router;
