const express = require('express');

const router = express.Router();

const { check } = require('express-validator');
const User = require('../controllers/user.controller');

const Middlewares = require('../middlewares/index');

router.post(
  '/register',
  [
    check('userName', 'Field cannot be empty').notEmpty(),
    check('password', 'Your password must be min 4 and max 12 characters').isLength({
      min: 4,
      max: 12,
    }),
  ],
  User.registerUser
);

router.post('/login', User.loginUser);

router.get('/logout', User.logout, Middlewares.requireAuthorization);

router.use(Middlewares.authorization);

router.get('/profile', User.getUserProfile);

router.get('/users', User.getUsers);

module.exports = router;
