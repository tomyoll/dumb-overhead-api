const express = require('express');

const router = express.Router();
const question = require('./question.router');
const user = require('./user.router');
const Middlewares = require('../middlewares/');

router.use('/question', question);

router.use('/user', user);

router.use(Middlewares.errorHandler);

module.exports = router;
